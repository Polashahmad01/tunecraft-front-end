import TagLine from "../components/TagLine";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {

  return (
    <section className="bg-white dark:bg-black">
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <div className="grid grid-cols-1 place-items-center">
        <RegisterForm />
      </div>
      <div className="">
        <TagLine />
      </div>
      </div>
    </section>
  )
}
