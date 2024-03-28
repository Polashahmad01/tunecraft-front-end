import TagLine from "../components/TagLine";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  
  return (
    <section className="bg-white dark:bg-black">
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <div className="grid grid-cols-1 place-items-center">
        <ResetPasswordForm />
      </div>
      <div className="">
        <TagLine />
      </div>
      </div>
    </section>
  )
}
