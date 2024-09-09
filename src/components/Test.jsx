import OpenAI from 'openai';

// Initialize OpenAI client with your API key
const client = new OpenAI({
  apiKey: 'sk-svcacct-lvDwutd_xNutS7_DvM4FPA2sNv692SbsDVxO4EJURnPIXezZwT3BlbkFJ7_zs1XUGSddJSq6Md6avoMBcRAkS_Je5TBCgVNEtQLCdAVMAA' // Replace with your API key
});

const Test = async () => {
  try {
    // Make sure this is within an async function
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-4' // Check for the correct model name
    }).asResponse();

    // Access the underlying Response object
    console.log(response.headers.get('x-request-id'));

    return (
      <div>
        {/* Add relevant content here */}
        <p>Check console for x-request-id</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching completion:', error);
    return (
      <div>
        <p>Error fetching completion. Check console for details.</p>
      </div>
    );
  }
}

export default Test;
