import TagLine from "../components/TagLine";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  
  return (
    <section className="bg-white dark:bg-black">
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
        <div className="grid grid-cols-1 place-items-center">
          <LoginForm />
        </div>
        <div className="">
          <TagLine />
        </div>
      </div>
    </section>
  )
}
