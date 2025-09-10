interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: "Contact Us",
    description: "Connect with our RMs and Get Best Unlisted Share Prices.",
  },
  {
    id: 2,
    title: "Deal Processing",
    description:
      "First, the buyer sends payment to our bank Then UnlistedZone team starts processing.",
  },
  {
    id: 3,
    title: "Deal Completion",
    description:
      "After Getting the payment our Team Transfer Shares with 24 hrs.",
  },
];
interface ProcessStepType {
  data?: {
    title: string|undefined;
    subTitle: string|undefined;
  };
  isLoading: boolean;
}


const ProcessSteps: React.FC<ProcessStepType> = ({ data, isLoading }) => {

    if (isLoading) {
    return (
      <section className="heroHomeBanner relative bg-white py-12 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          {data?.title || "Process to Buy Unlisted Shares"}
        </h1>
        <p className="text-center text-gray-600 mb-8 text-[20px]">
          {data?.subTitle || "Recommended for those interested in dealing with unlisted shares."}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full text-xl font-bold mr-4">
                {step.id}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h2>
            </div>
            <p className="text-gray-600 pl-16">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
