import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const Index = () => {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const calculateMonthlyPayment = () => {
    const rate = 0.12;
    const monthlyRate = rate / 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                    (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return payment.toFixed(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 15 минут",
    });
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">КредитЭксперт</h1>
          <nav className="hidden md:flex gap-8">
            <a href="#benefits" className="text-foreground hover:text-primary transition-colors">Преимущества</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition-colors">Калькулятор</a>
            <a href="#conditions" className="text-foreground hover:text-primary transition-colors">Условия</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="hidden md:block">+7 999 222 44 55</Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Получите кредит
            <span className="text-primary block mt-2">на выгодных условиях</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Помогаем получить кредит даже при отказе банков. Работаем с 50+ банками и находим лучшие предложения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>
              Подать заявку
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
              Рассчитать кредит
            </Button>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Почему выбирают нас</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "Shield", title: "Гарантия одобрения", desc: "98% заявок одобряются", color: "text-blue-600" },
              { icon: "Clock", title: "Быстрое решение", desc: "Ответ за 15 минут", color: "text-blue-500" },
              { icon: "Percent", title: "Низкие ставки", desc: "От 9.9% годовых", color: "text-blue-600" },
              { icon: "Users", title: "5000+ клиентов", desc: "Доверяют нам", color: "text-blue-500" },
            ].map((item, i) => (
              <Card key={i} className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 ${item.color}`}>
                    <Icon name={item.icon as any} size={32} />
                  </div>
                  <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Кредитный калькулятор</h3>
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <Label className="text-lg mb-4 block">Сумма кредита: <span className="text-primary font-bold">{loanAmount.toLocaleString('ru-RU')} ₽</span></Label>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={50000}
                      max={5000000}
                      step={50000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>50 000 ₽</span>
                      <span>5 000 000 ₽</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg mb-4 block">Срок кредита: <span className="text-primary font-bold">{loanTerm} мес</span></Label>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      min={6}
                      max={60}
                      step={6}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>6 мес</span>
                      <span>60 мес</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-6 text-center border-2 border-primary">
                    <p className="text-muted-foreground mb-2">Ежемесячный платёж</p>
                    <p className="text-4xl font-bold text-primary">{calculateMonthlyPayment()} ₽</p>
                  </div>

                  <Button size="lg" className="w-full" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>
                    Оформить заявку с этими параметрами
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="conditions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Условия получения кредита</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: "FileText", title: "Минимум документов", desc: "Паспорт и второй документ" },
              { icon: "BadgeCheck", title: "Любая кредитная история", desc: "Даже при просрочках" },
              { icon: "Wallet", title: "Любой доход", desc: "Официальный и неофициальный" },
              { icon: "Home", title: "Без залога", desc: "Не требуется имущество" },
              { icon: "UserCheck", title: "Возраст от 18 лет", desc: "До 75 лет" },
              { icon: "Globe", title: "Любой регион", desc: "Работаем по всей России" },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                      <Icon name={item.icon as any} size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="application" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Подать заявку на кредит</h3>
            <p className="text-center text-muted-foreground mb-8">Заполните форму и мы свяжемся с вами в течение 15 минут</p>
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-muted-foreground">
                    <Icon name="Lock" size={16} className="inline mr-2 text-primary" />
                    Ваши данные защищены и не передаются третьим лицам
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Отправить заявку
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Контакты</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Icon name="Phone" size={28} />
                </div>
                <h4 className="font-semibold mb-2">Телефон</h4>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 9:00 - 21:00</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Icon name="Mail" size={28} />
                </div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-muted-foreground">info@creditexpert.ru</p>
                <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Icon name="MapPin" size={28} />
                </div>
                <h4 className="font-semibold mb-2">Офис</h4>
                <p className="text-muted-foreground">Москва, ул. Примерная, д. 1</p>
                <p className="text-sm text-muted-foreground mt-1">м. Площадь Революции</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-xl mb-4">КредитЭксперт</h4>
              <p className="text-blue-100">Профессиональная помощь в получении кредитов. Работаем с 2015 года.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Потребительские кредиты</li>
                <li>Ипотека</li>
                <li>Рефинансирование</li>
                <li>Кредит под залог</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-blue-100">
                <li>+7 (495) 123-45-67</li>
                <li>info@creditexpert.ru</li>
                <li>Москва, ул. Примерная, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-400 pt-8 text-center text-blue-100">
            <p>&copy; 2024 КредитЭксперт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;