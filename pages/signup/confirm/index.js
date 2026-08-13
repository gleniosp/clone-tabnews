import { Banner } from "@primer/react";
import DefaultLayout from "interface/DefaultLayout";

export default function ConfirmSignUpPage() {
  return (
    <DefaultLayout
      contentWidth="small"
      metadata={{ title: "Confirm your email" }}
    >
      <Banner
        variant="warning"
        title="Only one step missing!"
        description="Open the email sent by Clone TabNews and click on the confirmation link."
      />
    </DefaultLayout>
  );
}
