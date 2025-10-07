import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Договор публичной оферты | Planery Studio",
  description: "Договор публичной оферты о продаже цифровых товаров Planery Studio",
};

export default function TermsPage() {
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
              Договор публичной оферты
            </h1>
            <p className="text-gray-600 mb-8">(о продаже цифровых товаров)</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Настоящий документ является официальным предложением индивидуального предпринимателя <strong>ИП Акадил Ардак</strong>, действующего в соответствии с законодательством Республики Казахстан (далее — «Продавец»), и представляет собой публичную оферту (далее — «Оферта»), адресованную любому физическому или юридическому лицу (далее — «Покупатель») заключить договор купли-продажи цифровых товаров на изложенных ниже условиях.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Принятием (акцептом)</strong> условий настоящей Оферты считается совершение Покупателем действий по оплате цифрового товара через сайт <strong>planerystudio.com</strong>. С момента оплаты Оферта считается принятой, а между Продавцом и Покупателем заключён договор купли-продажи цифрового товара (далее — «Договор»).
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.1.</strong> Настоящая Оферта регулирует отношения между Продавцом и Покупателем при продаже цифровых товаров (включая, но не ограничиваясь: шаблонами, файлами, электронными материалами и т.д.) через сайт planerystudio.com.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.2.</strong> Настоящая Оферта является публичной в соответствии со статьёй 395 Гражданского кодекса Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>1.3.</strong> Продавец вправе в одностороннем порядке изменять условия настоящей Оферты. Все изменения вступают в силу с момента их опубликования на сайте и применяются исключительно к правоотношениям, возникшим после даты публикации. Условия Оферты, действовавшие на момент оплаты заказа, сохраняют силу в отношении соответствующего договора.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Предмет договора</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.1.</strong> Продавец обязуется предоставить Покупателю цифровой товар (далее — «Продукт»), а Покупатель обязуется оплатить его на условиях настоящей Оферты.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.2.</strong> Цифровой товар предоставляется в виде файла, шаблона, ссылки для скачивания или иным электронным способом, указанным на сайте.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>2.3.</strong> Покупатель подтверждает, что приобретаемый Продукт предназначен исключительно для личного использования.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Порядок оформления заказа</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.1.</strong> Заказ оформляется Покупателем самостоятельно через сайт planerystudio.com.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.2.</strong> Оплата осуществляется безналичным способом через платёжную систему Robokassa.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.3.</strong> Договор считается заключённым с момента зачисления денежных средств на расчётный счёт Продавца.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>3.4.</strong> После оплаты Покупатель получает доступ к цифровому товару по электронной почте, в личном кабинете, через ссылку для скачивания или иным способом, указанным на сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Условия возврата и отказа</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>4.1.</strong> В соответствии с пунктом 14 статьи 30 Закона Республики Казахстан «О защите прав потребителей» цифровые товары надлежащего качества <strong className="text-red-700">не подлежат возврату и обмену</strong> после их получения Покупателем.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.2.</strong> Возврат денежных средств возможен только в случае, если Продавец не предоставил оплаченный товар или предоставил товар, не соответствующий описанию.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>4.3.</strong> Покупатель подтверждает и соглашается, что факт получения доступа к цифровому товару является фактом его передачи.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Права и обязанности сторон</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1. Продавец обязуется:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>предоставить оплаченный цифровой товар Покупателю в срок, указанный на сайте;</li>
                  <li>обеспечить конфиденциальность данных Покупателя.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2. Продавец имеет право:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>изменять ассортимент, стоимость и условия продажи товаров без уведомления Покупателя (для будущих сделок);</li>
                  <li>приостанавливать доступ к товару в случае нарушения Покупателем условий настоящего Договора;</li>
                  <li>прекратить продажу цифровых товаров в любое время.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3. Покупатель обязуется:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>предоставить достоверные данные при оформлении заказа;</li>
                  <li>оплатить товар в полном объёме;</li>
                  <li>использовать полученный продукт исключительно в личных целях;</li>
                  <li>не распространять, не передавать третьим лицам, не копировать, не публиковать и не перепродавать цифровой товар без письменного согласия Продавца.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Авторские права и лицензия</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>6.1.</strong> Все цифровые товары являются объектами авторского права Продавца и защищены законодательством Республики Казахстан и международными договорами.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>6.2.</strong> Покупатель получает <strong className="text-amber-700">неисключительную, непередаваемую лицензию</strong> на использование цифрового товара исключительно в личных целях.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>6.3.</strong> Любое использование цифрового товара в коммерческих целях, а также его распространение, копирование или изменение без письменного согласия Продавца запрещено и влечёт ответственность в соответствии с законодательством.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Ограничение ответственности</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.1.</strong> Цифровой товар предоставляется Покупателю по принципу «как есть» («as is»). Продавец не гарантирует его пригодность для конкретных целей.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.2.</strong> Продавец не несёт ответственности за:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
                  <li>несовместимость товара с программным обеспечением или устройствами Покупателя;</li>
                  <li>невозможность доступа к товару по причинам, не зависящим от Продавца;</li>
                  <li>любые прямые или косвенные убытки, возникшие в результате использования или невозможности использования товара.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>7.3.</strong> Ответственность Продавца ограничена суммой, уплаченной Покупателем за цифровой товар.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Применимое право и разрешение споров</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>8.1.</strong> Все правоотношения по настоящему Договору регулируются законодательством Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>8.2.</strong> Все споры и разногласия разрешаются путём переговоров. В случае невозможности урегулирования спор передаётся на рассмотрение суда Республики Казахстан по месту регистрации Продавца.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Контактные данные Продавца</h2>
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
