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
            <p className="text-gray-600 mb-8">о продаже цифровых товаров Planery Studio</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Настоящий документ определяет условия продажи цифровых (электронных) товаров через интернет-магазин{" "}
                <strong>planerystudio.com</strong>, принадлежащий индивидуальному предпринимателю{" "}
                <strong>ИП Акадил Ардак</strong> (далее — «Интернет-магазин», «Продавец»).
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Политика проведения платежей. Оплата банковской картой онлайн
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Наш сайт подключен к интернет-эквайрингу, и вы можете оплатить заказ банковской картой Visa или Mastercard
                  прямо на сайте. После подтверждения выбранного заказа откроется защищенное окно с платежной страницей
                  платёжного сервиса Robokassa, где необходимо ввести данные банковской карты и адрес электронной почты для
                  получения квитанции или фискального чека. Мы используем протокол 3D Secure для подтверждения оплаты. Если
                  ваш банк поддерживает данный протокол, вы будете перенаправлены на сервер банка для дополнительной
                  идентификации с помощью SMS-кода.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  На платежной странице требуется указать номер карты, адрес электронной почты, срок действия карты и
                  трёхзначный код безопасности (CVV2 для Visa или CVC2 для MasterCard). Все необходимые данные размещены на
                  поверхности банковской карты. CVV2/CVC2 — это трёхзначный код безопасности, находящийся на оборотной стороне
                  карты.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Далее в том же окне откроется страница вашего банка-эмитента для ввода 3D Secure кода. В случае, если у вас
                  не настроен статичный 3D Secure, он будет отправлен на ваш номер телефона посредством SMS. Если код не
                  пришёл, необходимо обратиться в ваш банк-эмитент. 3D Secure — современная технология обеспечения безопасности
                  платежей по картам в интернете: она позволяет однозначно идентифицировать подлинность держателя карты и
                  минимизировать риск мошеннических операций.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Случаи отказа в совершении платежа
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  В случае, если платёж не прошёл или операция была отменена, проверьте:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>правильно ли введены реквизиты карты (номер и срок действия);</li>
                  <li>достаточно ли средств на карте; уточнить информацию можно в банке-эмитенте;</li>
                  <li>открыта ли возможность проведения оплат в интернете и каковы лимиты вашей карты;</li>
                  <li>поддерживается ли суточный лимит на интернет-платежи.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  По вопросам непрошедшей оплаты обращайтесь в службу поддержки банка, выпустившего вашу карту, или в службу
                  поддержки сайта, на котором была произведена оплата.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Гарантии безопасности</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Платёжный сервис Robokassa защищает и обрабатывает данные банковских карт по стандарту безопасности PCI DSS.
                  Передача информации в платёжный шлюз происходит с применением технологии шифрования SSL, дальнейшая передача
                  ведётся по закрытым банковским сетям. Robokassa не передает данные вашей карты интернет-магазину или третьим
                  лицам. Для дополнительной аутентификации держателя карты используется протокол 3D Secure.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  По вопросам реализованных платежей можно обратиться в службу поддержки Robokassa по адресу
                  <a
                    href="mailto:support@robokassa.kz"
                    className="text-[var(--brand)] hover:text-[var(--brand-dark)]"
                  >
                    {" "}
                    support@robokassa.kz
                  </a>
                  .
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Безопасность онлайн-платежей</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Персональная информация, предоставляемая при оплате (e-mail, номер банковской карты), является
                  конфиденциальной и не подлежит разглашению. Данные банковской карты передаются только в зашифрованном виде и
                  не сохраняются на нашем сервере. Все операции с картами выполняются в соответствии с требованиями VISA
                  International, MasterCard Worldwide и других платёжных систем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Авторизация гарантирует, что платёжные реквизиты карты не попадут к мошенникам, поскольку не хранятся в
                  открытом виде. Покупатель вводит данные непосредственно в системе авторизации Robokassa, а не на сайте
                  интернет-магазина, поэтому реквизиты карты не доступны третьим лицам.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Договор публичной оферты интернет-магазина «Planery Studio»
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Настоящий договор между интернет-магазином «Planery Studio» (Продавец) и пользователем услуг
                  интернет-магазина (Покупатель) определяет условия приобретения цифровых товаров на сайте{" "}
                  <strong>planerystudio.com</strong>.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Общие положения</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.1.</strong> Индивидуальный предприниматель ИП Акадил Ардак публикует настоящий договор
                  купли-продажи, являющийся публичной офертой в адрес физических и юридических лиц в соответствии со ст. 447
                  Гражданского кодекса Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.2.</strong> Оферта определяет все существенные условия договора между ИП Акадил Ардак и лицом,
                  акцептовавшим её.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.3.</strong> Договор заключается в момент оформления заказа Покупателем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.4.</strong> Оферта может быть принята любым лицом на территории Республики Казахстан, имеющим
                  намерение приобрести товары, реализуемые через сайт{" "}
                  <strong>https://planerystudio.com</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.5.</strong> Покупатель безоговорочно принимает условия оферты в полном объёме.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.6.</strong> Лицо, акцептовавшее оферту, становится Покупателем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>1.7.</strong> Акцепт — получение Продавцом сообщения о намерении приобрести электронные товары на
                  условиях, предложенных Продавцом.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>1.8.</strong> Оферта, приложения и дополнительная информация о товарах размещены на сайте{" "}
                  <strong>planerystudio.com</strong>.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Статус интернет-магазина</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.1.</strong> Интернет-магазин является собственностью ИП Акадил Ардак, дистрибьютора электронных
                  товаров автора Planery Studio на территории Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>2.2.</strong> Сделки регулируются договором публичной оферты, размещённым на сайте. После оплаты
                  заказа Покупатель получает товар на условиях договора купли-продажи.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>2.3.</strong> Интернет-магазин не несёт ответственности за содержание и достоверность информации,
                  предоставленной Покупателем при оформлении заказа.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Статус Покупателя</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.1.</strong> Покупатель несёт ответственность за достоверность предоставленной информации и её
                  свободу от претензий третьих лиц.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.2.</strong> Согласие с условиями договора подтверждается отметкой «Условия Договора мною прочитаны
                  полностью...» при оформлении заказа.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>3.3.</strong> Информация о Покупателе является конфиденциальной. Предоставляя персональные данные,
                  Покупатель даёт согласие на их обработку в целях исполнения договора.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>3.4.</strong> Товар приобретается для личных нужд. Электронные товары являются интеллектуальной
                  собственностью автора и дистрибьютора Planery Studio. Использование ресурса интернет-магазина для просмотра и
                  оформления заказа осуществляется бесплатно.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Предмет оферты</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.1.</strong> Продавец продаёт электронные товары на основании заказа Покупателя по ценам, указанным в
                  оферте и приложениях.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.2.</strong> Отправка товара осуществляется через электронную почту (e-mail).
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>4.3.</strong> К отношениям применяются положения ГК РК, Закон «О защите прав потребителей» и иные
                  нормативные акты.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>4.4.</strong> Лицо считается принявшим условия оферты с момента получения Продавцом сообщения о
                  намерении приобрести товар. С этого момента договор считается заключённым.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  5. Порядок заключения договора купли-продажи
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.1.</strong> Заказ может быть оформлен самостоятельно на сайте интернет-магазина.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.2.</strong> При оформлении заказа необходимо указать Ф.И.О. (или наименование и ИНН для юридических
                  лиц), контактный телефон и электронную почту.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.3.</strong> Волеизъявление Покупателя осуществляется путём заполнения формы заказа либо подачи
                  заявки через менеджера или по электронной почте.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>5.4.</strong> Интернет-магазин не редактирует информацию о Покупателе.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>5.5.</strong> Для получения бумажного экземпляра договора Покупатель направляет заявку по контактам,
                  указанным на сайте.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Информация о товаре</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>6.1.</strong> Товар представлен на сайте посредством графических изображений-образцов, являющихся
                  собственностью интернет-магазина.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>6.2.</strong> Каждое изображение сопровождается названием, характеристиками и ценой.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>6.3.</strong> Информационные материалы носят справочный характер и могут не полностью отражать
                  свойства товара. При возникновении вопросов Покупатель обязан обратиться к Продавцу до оформления заказа.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>6.4.</strong> По запросу Покупателя менеджер предоставляет дополнительную информацию. Товар, указанный
                  в счёте отдельными позициями, не является комплектом.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Порядок приобретения товара</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.1.</strong> Покупатель вправе оформить заказ на электронные товары в любом количестве, если иное не
                  указано в описании товара.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.2.</strong> Заказ может быть оформлен по телефону или самостоятельно на сайте.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>7.3.</strong> После оформления заказа Продавец подтверждает его по электронной почте или телефону.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>7.4.</strong> Срок поставки товара — не более 3 дней со следующего дня после получения сообщения о
                  намерении купить товар.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Цена товара</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>8.1.</strong> Цены указаны в тенге Республики Казахстан за единицу товара.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>8.2.</strong> Продавец вправе изменять цены в одностороннем порядке. Стоимость оплаченного товара
                  изменению не подлежит.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>8.3.</strong> Полная стоимость заказа состоит из каталожной стоимости товара. Стоимость дополнительных
                  услуг, если применимо, указана в разделе «Оплата и доставка».
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Оплата товара</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>9.1.</strong> Способы оплаты указаны на сайте в разделе «Оплата и доставка». Условия оплаты могут
                  уточняться с менеджером.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>9.2.</strong> При наличной форме оплаты цена товара уплачивается представителю интернет-магазина в
                  момент передачи товара.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>9.3.</strong> При безналичной оплате расчёт производится по счёту в течение трёх банковских дней.
                  Обязанность по оплате считается исполненной после зачисления средств на счёт Продавца, после чего товар
                  отправляется на e-mail Покупателя.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>9.4.</strong> Покупатель оплачивает заказ любым доступным в интернет-магазине способом.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>9.5.</strong> Расчёты осуществляются в тенге Республики Казахстан.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Доставка товаров</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>10.1.</strong> Электронные товары направляются на адрес электронной почты, указанный Покупателем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>10.2.</strong> Самовывоз электронных товаров не предусмотрен.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>10.3.</strong> Обязательство по передаче товара считается исполненным с момента передачи электронного
                  файла посредством выбранного канала доставки.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Гарантии на товар</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>11.1.</strong> Гарантийный срок эксплуатации товара составляет 1 неделю с момента передачи, если иное
                  не предусмотрено дополнительным соглашением.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">12. Возврат товара</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>12.1.</strong> Цифровой товар надлежащего качества возврату не подлежит.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13. Ответственность сторон</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>13.1.</strong> Стороны несут ответственность в соответствии с законодательством Республики Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>13.2.</strong> Продавец не несёт ответственности за убытки, возникшие вследствие ненадлежащего
                  использования товара Покупателем.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>13.3.</strong> Стороны освобождаются от ответственности на период действия обстоятельств непреодолимой
                  силы.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">14. Прочие условия</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>14.1.</strong> К отношениям между Покупателем и Продавцом применяется законодательство Республики
                  Казахстан.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>14.2.</strong> Стороны вправе оформить двусторонний договор купли-продажи, не противоречащий условиям
                  настоящей оферты.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>14.3.</strong> Вопросы и претензии направляются через контакты, указанные на сайте{" "}
                  <strong>planerystudio.com</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>14.4.</strong> Договор вступает в силу с даты акцепта оферты и действует до полного исполнения
                  обязательств Сторонами.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>14.5.</strong> Споры решаются посредством переговоров, а при невозможности — в судебном порядке по
                  законодательству Республики Казахстан. Интернет-магазин вправе менять ассортимент, регулировать доступ к
                  покупке и приостанавливать продажи товаров по собственному усмотрению.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Адрес и реквизиты продавца</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Сайт:</strong> https://planerystudio.com
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Наименование:</strong> ИП Акадил Ардак
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Юридический адрес:</strong> г. Астана, проспект Кабанбай батыр, д. 59/2, офис 140
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>БИН/ИИН:</strong> 020929501352
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>БИК:</strong> CASPKZKA, АО «Kaspi Bank»
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>ИИК:</strong> KZ38722S000030888905
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
