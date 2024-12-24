import ShieldPath from "@/components/ShieldPath";

const Index = () => {
  return (
    <div className="min-h-[200vh] relative">
      <ShieldPath />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Welcome to Shield Protection</h1>
        <p className="text-xl mb-4">Scroll down to see the shield in action!</p>
        <div className="space-y-40">
          {[1, 2, 3].map((section) => (
            <div key={section} className="p-6 rounded-lg bg-shield-secondary/5">
              <h2 className="text-2xl font-semibold mb-4">Section {section}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;