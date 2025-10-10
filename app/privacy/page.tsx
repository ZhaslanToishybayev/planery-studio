import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Planery Studio",
  description: "Политика конфиденциальности и обработки персональных данных Planery Studio",
};

export default function PrivacyPage() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="container-1200 py-20">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--brand)] hover:text-[var(--brand-dark)] transition mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              На главную
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Политика конфиденциальности и обработки персональных данных
            </h1>
            <p className="text-gray-600 mb-8">Planery Studio</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Настоящая политика конфиденциальности регулирует порядок обработки и использования персональных и иных данных
                сайта <strong>https://planerystudio.com</strong> (далее — «Оператор»). Оператором является индивидуальный
                предприниматель Акадил Ардак, осуществляющий деятельность под проектом Planery Studio, г. Астана, Республика
                Казахстан. Действующая редакция политики постоянно доступна для ознакомления на сайте Оператора.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Передавая Оператору персональные и иные данные посредством сайта, пользователь подтверждает своё согласие на
                использование указанных данных на условиях, изложенных в настоящей Политике.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Если пользователь не согласен с условиями Политики, он обязан прекратить использование сайта. Безусловным
                акцептом Политики является начало использования сайта пользователем.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Термины</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.1.</strong> Сайт — ресурс по адресу <strong>https://planerystudio.com</strong>. Исключительные права
                  на Сайт и его элементы принадлежат Оператору. Передача исключительных прав Пользователю не является предметом
                  Политики.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.2.</strong> Пользователь — лицо, использующее Сайт.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.3.</strong> Законодательство — действующее законодательство Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.4.</strong> Персональные данные — данные, предоставляемые Пользователем при оформлении заказа,
                  регистрации или использовании функционала Сайта.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.5.</strong> Данные — иные сведения о Пользователе, не относящиеся к персональным данным.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.6.</strong> Услуги — продажа цифровых (электронных) товаров и предоставление доступа к ним.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>1.7.</strong> Оператор — ИП Акадил Ардак, проект Planery Studio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Сбор и обработка персональных данных</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.1.</strong> Оператор собирает и хранит только те персональные данные, которые необходимы для
                  оказания услуг и взаимодействия с Пользователем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.2.</strong> Персональные данные могут использоваться в следующих целях:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>оказание услуг Пользователю (продажа цифровых товаров);</li>
                  <li>идентификация Пользователя;</li>
                  <li>взаимодействие с Пользователем, включая отправку электронных писем;</li>
                  <li>направление уведомлений и информации, связанных с заказами;</li>
                  <li>выполнение требований законодательства Республики Казахстан.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.3.</strong> Оператор обрабатывает следующие данные Пользователя:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>фамилия, имя и отчество (если указано);</li>
                  <li>адрес электронной почты;</li>
                  <li>номер телефона (при необходимости);</li>
                  <li>сведения о произведённых платежах (обрабатываются платёжной системой Robokassa).</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>2.4.</strong> Пользователю запрещается указывать на Сайте персональные данные третьих лиц без
                  законных оснований или письменного согласия таких лиц.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Порядок обработки и передачи персональных данных
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.1.</strong> Оператор использует персональные данные в соответствии с Законом «О персональных данных»
                  Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.2.</strong> Персональные данные хранятся конфиденциально, за исключением случаев, когда они являются
                  общедоступными или подлежат раскрытию по требованию государственных органов.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.3.</strong> Оператор вправе хранить персональные данные на серверах, расположенных как на
                  территории, так и вне территории Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.4.</strong> Оператор вправе передавать персональные данные без согласия Пользователя:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>государственным органам — в случаях, предусмотренных законом;</li>
                  <li>платёжной системе Robokassa — для обработки платежей и подтверждения оплаты заказов;</li>
                  <li>в иных случаях, предусмотренных законодательством Республики Казахстан.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>3.5.</strong> Передача персональных данных третьим лицам, не указанным выше, возможна только с
                  согласия Пользователя и исключительно для выполнения обязательств по заказу (например, доставка электронного
                  товара на e-mail).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Защита персональных данных</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.1.</strong> Оператор принимает необходимые организационные и технические меры для защиты
                  персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования
                  и распространения.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>4.2.</strong> Безопасность онлайн-платежей обеспечивает платёжный сервис Robokassa, который работает по
                  стандарту безопасности PCI DSS и использует протокол 3D Secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Иные положения</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.1.</strong> К Политике и отношениям между Пользователем и Оператором применяется законодательство
                  Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.2.</strong> Споры разрешаются в соответствии с действующим законодательством по месту регистрации
                  Оператора (г. Астана, Республика Казахстан). До обращения в суд Пользователь направляет претензию на адрес{" "}
                  <a href="mailto:ardvkk322@gmail.com" className="text-[var(--brand)] hover:text-[var(--brand-dark)]">
                    ardvkk322@gmail.com
                  </a>
                  .
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.3.</strong> Недействительность отдельных положений Политики не влияет на действие остальных
                  положений.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.4.</strong> Оператор вправе изменять Политику в одностороннем порядке без предварительного
                  уведомления Пользователя. Новая редакция вступает в силу с момента публикации на сайте{" "}
                  <strong>https://planerystudio.com</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>5.5.</strong> Вопросы по Политике конфиденциальности направляются на электронную почту{" "}
                  <a href="mailto:ardvkk322@gmail.com" className="text-[var(--brand)] hover:text-[var(--brand-dark)]">
                    ardvkk322@gmail.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
