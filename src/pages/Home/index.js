import React, {useState} from "react";


const Index = () => {
  const [smiles1, setSmiles1] = useState("");
  const [smiles2, setSmiles2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
  };

  return (
    <div className="bg-[#d0f0c0] min-h-screen px-6 lg:px-16 pt-6 lg:pt-16">
      <Title />

      <div className="flex flex-col gap-3 items-center mt-10">
        <div>
          <p className="text-sm text-[#50285a] font-light mb-1">
            <span className="text-red-700">*</span> Drug One
         
          </p>
          <Input placeholder="Enter first SMILES string"
        value={smiles1}
        onChange={(e) => setSmiles1(e.target.value)} />
        </div>
        <div>
          <p className="text-sm text-[#50285a] font-light mb-1">
            <span className="text-red-700">*</span> Drug Two
          
          </p>
          <Input placeholder="Enter second SMILES string"
        value={smiles2}
        onChange={(e) => setSmiles2(e.target.value)}/>
        </div>

      <div>
      <button className="py-1.5 px-2 bg-[#50285a] rounded-lg text-white text-sm min-w-[200px]" onClick={handleSubmit} disabled={loading}>  {loading ? "Predicting..." : "Submit"}</button>
      </div>
      </div>

      <div className="mx-auto mt-10 w-[500px]  text-[#50285a]">
      {error && <p className="text-red-500">{error}</p>}
        <ul className="list-disc">
          <li> The result of drug one</li>
          <li>{result}</li>
        </ul>
      </div>
    </div>
  );
};

export default Index;

const Title = () => {
  return (
    <div>
      <div className="text-lg lg:text-2xl font-bold text-center text-[#50285a]">
        Drug-Drug Interaction
      </div>
      <p className="text-center text-sm text-[#50285a]">
        Analyze your drugs with two simple steps
      </p>
    </div>
  );
};

const Input = ({placeholder, value, onChange}) => {
  return (
    <div className="w-[500px] min-w-[300px] bg-transparent border border-1 border-[#50285a]  rounded-[10px] shadow-md ">
      <input className="w-full rounded-[10px] bg-inherit border-0 outline-none placeholder:text-xs caret-[#50285a] focus:bg-white py-2 px-3 "
      placeholder={placeholder}
      value ={value}
      onChange = {onChange}
      />
    </div>
  );
};
