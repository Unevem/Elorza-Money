import { Header } from '@/components/user/Header';
import { ExpenseForm } from '@/components/user/ExpenseForm';
import { DailyHistory } from '@/components/user/DailyHistory';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Header />

      <section className="w-full">
        <ExpenseForm />
      </section>

      <hr className="border-t-4 border-gray-100" />

      <section className="w-full">
        <DailyHistory />
      </section>
    </div>
  );
}
