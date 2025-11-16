import Header from "../../components/Header";

export default function Cookies() {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold mt-4">Cookie policy</h1>
      <p className="text-lg">
        Do we really use cookies? Yes. But only one. And we use it for – you
        guessed it – analytics! Nothing else. Read more about it here 👇
      </p>
      <h2 className="text-3xl font-medium mt-4">Statistics and analytics</h2>
      <p className="">
        We use one cookie to assign a unique user ID to your browser the first
        time you visit analytics.rip. This ID is anonymous and cannot be linked
        back to you. The ID will reset when you close your browser and will
        never be the same across devices or visits. We measure anonymous page
        views and interactions around the site.
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Cookie name</th>
              <th>Purpose</th>
              <th>Example value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>hash</td>
              <td>
                Aggregate website usage data into
                <br /> sessions for analytics purposes
              </td>
              <td>3320e2a7-2c1f-4d43-8fb5-ce6110d60e93</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        We use our custom build analytics tool that we might share with the rest
        of the world in the future ;)
      </p>
    </>
  );
}

