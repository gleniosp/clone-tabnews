import email from "infra/email.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "CloneTabNews <contact@clonetabnews.gleniosp.com>",
      to: "recipient@gmail.com",
      subject: "Subject test",
      text: "Body test.",
    });

    await email.send({
      from: "CloneTabNews <contact@clonetabnews.gleniosp.com>",
      to: "recipient@gmail.com",
      subject: "Last sent email",
      text: "Body of the last sent test.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contact@clonetabnews.gleniosp.com>");
    expect(lastEmail.recipients[0]).toBe("<recipient@gmail.com>");
    expect(lastEmail.subject).toBe("Last sent email");
    expect(lastEmail.text).toBe("Body of the last sent test.\r\n");
  });
});
