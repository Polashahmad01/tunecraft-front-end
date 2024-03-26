import TagLine from "../components/TagLine";

export default function LoginPage() {
  
  return (
    <section className="bg-white dark:bg-black">
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
        <div className="text-3xl font-bold text-black dark:text-white">Login Form</div>
        <div className="">
          <TagLine />
        </div>
      </div>
    </section>
  )
}
