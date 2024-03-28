import TagLine from "../components/TagLine";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  
  return (
    <section className="bg-white dark:bg-black">
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
        <div className="grid grid-cols-1 place-items-center">
          <ForgotPasswordForm />
        </div>
        <div className="">
          <TagLine />
        </div>
      </div>
    </section>
  )
}
