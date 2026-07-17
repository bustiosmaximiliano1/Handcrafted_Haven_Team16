import PageHeader from "@/components/PageHeader/PageHeader";
import StubNotice from "@/components/StubNotice/StubNotice";

/**
 * Register page — SCAFFOLDED.
 * The route exists so the "Become a seller" link resolves. Auth is a story.
 */
export default function RegisterPage() {
  return (
    <>
      <PageHeader title="Create your account" subtitle="Start selling your handmade work." />
      <StubNotice
        story="As a user, I want to register so I can list products as a seller."
        todo={[
          "Build the registration form (name, email, password)",
          "Validate the fields on the front-end",
          "Save the user with a hashed password",
          "Handle the 'email already registered' error",
        ]}
      />
    </>
  );
}
