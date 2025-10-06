"use client";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  isPopular?: boolean;
  features: {
    name: string;
    included: boolean | string;
  }[];
}

const plans: Plan[] = [
  {
    name: "Продуктивность",
    price: "4 990 ₸",
    features: [
      { name: "База задач", included: true },
      { name: "Трекер привычек", included: true },
      { name: "Проекты", included: true },
      { name: "База заметок", included: true },
      { name: "5 дашбордов", included: "5" },
      { name: "Расписание", included: false },
      { name: "Дедлайны студента", included: false },
      { name: "База конспектов", included: false },
      { name: "Приоритетная поддержка", included: false },
    ],
  },
  {
    name: "Полный набор",
    price: "6 990 ₸",
    isPopular: true,
    features: [
      { name: "База задач", included: true },
      { name: "Трекер привычек", included: true },
      { name: "Проекты", included: true },
      { name: "База заметок", included: true },
      { name: "10+ дашбордов", included: "10+" },
      { name: "Расписание", included: true },
      { name: "Дедлайны студента", included: true },
      { name: "База конспектов", included: true },
      { name: "Приоритетная поддержка", included: true },
    ],
  },
  {
    name: "Для студента",
    price: "3 490 ₸",
    features: [
      { name: "База задач", included: false },
      { name: "Трекер привычек", included: false },
      { name: "Проекты", included: false },
      { name: "База заметок", included: false },
      { name: "4 дашборда", included: "4" },
      { name: "Расписание", included: true },
      { name: "Дедлайны студента", included: true },
      { name: "База конспектов", included: true },
      { name: "Приоритетная поддержка", included: false },
    ],
  },
];

const featureList = [
  "База задач",
  "Трекер привычек",
  "Проекты",
  "База заметок",
  "Количество дашбордов",
  "Расписание занятий",
  "Дедлайны студента",
  "База конспектов",
  "Приоритетная поддержка",
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <motion.table
        className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="p-4 text-left font-semibold text-gray-600">Возможности</th>
            {plans.map((plan, index) => (
              <th
                key={index}
                className={`p-4 text-center ${
                  plan.isPopular ? "bg-[var(--brand)]/5" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="inline-flex px-3 py-1 rounded-full bg-[var(--brand)] text-white text-xs font-semibold mb-2">
                    Популярный
                  </div>
                )}
                <div className="font-bold text-lg">{plan.name}</div>
                <div className="text-2xl font-bold text-[var(--brand)] mt-2">
                  {plan.price}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureList.map((feature, featureIndex) => (
            <motion.tr
              key={featureIndex}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: featureIndex * 0.05 }}
            >
              <td className="p-4 text-gray-700">{feature}</td>
              {plans.map((plan, planIndex) => {
                const planFeature = plan.features[featureIndex];
                const included = planFeature.included;

                return (
                  <td
                    key={planIndex}
                    className={`p-4 text-center ${
                      plan.isPopular ? "bg-[var(--brand)]/5" : ""
                    }`}
                  >
                    {included === true ? (
                      <svg
                        className="w-6 h-6 text-green-500 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : included === false ? (
                      <svg
                        className="w-6 h-6 text-gray-300 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="font-semibold text-[var(--brand)]">
                        {included}
                      </span>
                    )}
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}
