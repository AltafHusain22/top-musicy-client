

const Feedback = () => {


   const handleFeedback = (event, feedback) => {
    console.log(feedback)
    event.preventDefault();
    const form = event.target;
    const fb = form.feedback.value;

    // Send the feedback to the API
    fetch(`http://localhost:5000/addclass/${feedback}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: fb }), // Wrap the feedback in an object
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
    
  };

  return (
    <div>
      {/* todo: have to be add a form for feedback */}
      <h2 className="text-3xl text-center mb-10">FeedBack For Instructor</h2>
      <div className="w-3/4 mx-auto bg-[#e5e8ec] p-10 h-96">
        <form onSubmit={handleFeedback} action="">
          <textarea
            name="feedback"
            className="textarea w-full h-48"
            placeholder="Write Feedback"
          ></textarea>
          <div className="text-end">
            <button type="submit" className="btn bg-orange-500 border-0 ">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
