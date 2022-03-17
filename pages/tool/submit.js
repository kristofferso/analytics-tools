import TextLink from "../../components/elements/TextLink";
import Page from "../../components/Page";

export default function Submit() {
  return (
    <Page>
      <form
        name="submit-tool"
        method="POST"
        action="/tool/submitted"
        data-netlify="true"
        netlify-honeypot="trick"
        className="flex flex-col gap-2"
      >
        <TextLink href="/">← Back to overview</TextLink>
        <h1 className="text-4xl font-bold mt-4">Submit tool</h1>
        <p className="">
          Are we missing an analytics tool in our overview? Submit it here, and
          we&apos;ll add it as fast as we can!
        </p>
        <div className="divider"></div>
        <div className="flex flex-col gap-6">
          <Input
            required
            type="text"
            label="Name of the tool"
            name="toolname"
          />
          <input type="hidden" name="form-name" value="submit-tool" />

          <Input required type="text" label="Website URL" name="url" />
          <Input type="textarea" label="Comments or feedback" name="comment" />
          <input type="text" name="trick" className="hidden" />
          <button
            type="submit"
            className="btn btn-primary rounded-full max-w-md"
          >
            Submit
          </button>
        </div>
      </form>
    </Page>
  );
}

const Input = ({ type, label, placeholder = "Type here", name, ...props }) => {
  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span>{label}</span>
      </label>
      {type === "text" && (
        <input
          {...props}
          type="text"
          name={name}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-md"
        />
      )}
      {type === "textarea" && (
        <textarea
          {...props}
          name={name}
          className="textarea textarea-bordered h-24"
          placeholder={placeholder}
        ></textarea>
      )}
    </div>
  );
};
