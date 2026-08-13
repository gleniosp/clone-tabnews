import { useState } from "react";
import { Button, FormControl, Heading, Stack, TextInput } from "@primer/react";
import DefaultLayout from "interface/DefaultLayout";

export default function SignupPage() {
  return (
    <DefaultLayout
      contentWidth="small"
      metadata={{ title: "Sign Up", description: "Create your free account" }}
    >
      <Stack gap="spacious">
        <Heading as="h1">Sign Up</Heading>
        <SignUpForm />
      </Stack>
    </DefaultLayout>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const requestBody = { username, email, password };

    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      location.href = "/signup/confirm";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="normal">
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <TextInput
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            block
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <TextInput
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            block
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <TextInput
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            block
          />
        </FormControl>

        <Stack.Item>
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </Stack.Item>
      </Stack>
    </form>
  );
}
