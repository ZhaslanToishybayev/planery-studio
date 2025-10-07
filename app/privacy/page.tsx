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
            {/* Back button */}
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
              Политика конфиденциальности
            </h1>
            <p className="text-gray-600 mb-8">(обработка и защита персональных данных)</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта <strong>planerystudio.com</strong>, принадлежащего индивидуальному предпринимателю <strong>ИП Акадил Ардак</strong> (далее — «Продавец»).
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                Используя сайт и/или оплачивая цифровые товары, пользователь (далее — «Пользователь» или «Покупатель») подтверждает своё согласие с условиями настоящей Политики.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.1.</strong> Настоящая Политика разработана в соответствии с законодательством Республики Казахстан и регулирует порядок обработки и защиты персональных данных, предоставляемых Пользователями.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.2.</strong> Использование сайта planerystudio.com означает безусловное согласие Пользователя с настоящей Политикой и условиями обработки его персональных данных.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>1.3.</strong> В случае несогласия с условиями Политики Пользователь обязан прекратить использование сайта и воздержаться от оформления заказов.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Сбор и обработка персональных данных</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.1.</strong> Продавец собирает только те персональные данные, которые необходимы для:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>оформления и исполнения договора купли-продажи цифрового товара;</li>
                  <li>предоставления доступа к приобретённому товару;</li>
                  <li>выполнения обязательств по обратной связи и технической поддержке;</li>
                  <li>рассылки уведомлений, новостей и специальных предложений (при отдельном согласии Пользователя);</li>
                  <li>соблюдения требований законодательства.</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.2.</strong> К персональным данным, которые может собирать Продавец, относятся:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>имя и фамилия;</li>
                  <li>адрес электронной почты;</li>
                  <li>контактные данные, указанные при оформлении заказа;</li>
                  <li>сведения о произведённых платежах (обрабатываются платёжной системой);</li>
                  <li>техническая информация (IP-адрес, cookies, данные о браузере и устройстве).</li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  <strong>2.3.</strong> Персональные данные могут собираться следующими способами:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>при регистрации или оформлении заказа на сайте;</li>
                  <li>при подписке на рассылку;</li>
                  <li>автоматически при посещении сайта (cookies, аналитика и т.д.).</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Цели обработки персональных данных</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.1.</strong> Персональные данные обрабатываются исключительно в целях:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>заключения и исполнения договора купли-продажи;</li>
                  <li>предоставления Пользователю цифрового товара;</li>
                  <li>коммуникации и обратной связи;</li>
                  <li>отправки информационных и маркетинговых материалов (при согласии);</li>
                  <li>улучшения качества работы сайта и пользовательского опыта.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Передача персональных данных третьим лицам</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.1.</strong> Продавец может передавать персональные данные третьим лицам исключительно в случаях:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>для обработки платежей (например, платёжной системе Robokassa);</li>
                  <li>для предоставления услуг хостинга, аналитики и рассылки;</li>
                  <li>в случаях, прямо предусмотренных законодательством.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.2.</strong> Все третьи лица обязуются соблюдать конфиденциальность персональных данных и использовать их исключительно для указанных целей.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>4.3.</strong> Продавец не несёт ответственности за действия третьих лиц, если они действуют в рамках самостоятельных обязательств перед Пользователем (например, платёжные сервисы или почтовые провайдеры).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Хранение и защита персональных данных</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.1.</strong> Персональные данные обрабатываются с соблюдением принципов законности, добросовестности и конфиденциальности.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.2.</strong> Продавец принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>5.3.</strong> Данные хранятся только в течение срока, необходимого для выполнения целей их обработки, или в течение срока, установленного законодательством.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies и аналитика</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>6.1.</strong> Сайт может использовать файлы cookies для персонализации работы, анализа трафика и улучшения качества предоставляемых услуг.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>6.2.</strong> Пользователь может отключить использование cookies в настройках браузера. Однако это может повлиять на функциональность сайта.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Права пользователя</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.1.</strong> Пользователь имеет право:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>получить информацию о своих персональных данных, обрабатываемых Продавцом;</li>
                  <li>потребовать их изменения, обновления или удаления (в случаях, предусмотренных законом);</li>
                  <li>отозвать согласие на обработку персональных данных.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>7.2.</strong> Отзыв согласия не влияет на законность обработки данных, осуществлённой до момента отзыва.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Отказ от ответственности</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>8.1.</strong> Продавец не несёт ответственности за убытки Пользователя, возникшие в результате:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>утраты доступа к аккаунту или электронной почте по вине самого Пользователя;</li>
                  <li>передачи данных третьим лицам самим Пользователем;</li>
                  <li>технических сбоев, возникших не по вине Продавца.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>8.2.</strong> Продавец не гарантирует бесперебойную работу сайта и не несёт ответственности за невозможность его использования по причинам, не зависящим от него.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Изменение Политики конфиденциальности</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>9.1.</strong> Продавец вправе изменять настоящую Политику конфиденциальности в одностороннем порядке.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>9.2.</strong> Новая редакция вступает в силу с момента её опубликования на сайте и применяется к обработке данных, начатой после этой даты.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Контактные данные Продавца</h2>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>ИП Акадил Ардак</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  📍 Адрес: г. Астана, Республика Казахстан
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  📬 Email: ardvkk322@gmail.com
                </p>
                <p className="text-gray-700 leading-relaxed">
                  🌐 Сайт: planerystudio.com
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
