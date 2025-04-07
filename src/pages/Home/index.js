import React, { useState, useEffect } from "react";
import axios from "axios";
import initRDKitModule from "@rdkit/rdkit";
import interactionStatements from '../../data/drug_interaction_results'



const Index = () => {

  const [smiles1, setSmiles1] = useState("");
  const [smiles2, setSmiles2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
 
  const [RDKit, setRDKit] = useState(null);

  useEffect(() => {
    initRDKitModule({
      locateFile: () => '/RDKit_minimal.wasm'
    }).then((instance) => {
      setRDKit(instance);
    });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(smiles1, smiles2);
    if (smiles1 === "" || smiles2 === "") {
      setIsValid(false);
      setLoading(false);
      return
    }
    try {
      setResult(null)
      setLoading(true);
      let mol1 = RDKit?.get_mol(smiles1);
      let mol2 = RDKit?.get_mol(smiles2);
      if (mol1 && mol2) {
        setIsValid(true);
        const response = await axios.post("http://127.0.0.1:5000/drug/predict", {
          smiles1,
          smiles2,
        });
        setResult(response.data.prediction);
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#d0f0c0] min-h-screen px-6 lg:px-16 pt-6 lg:pt-16">
      <Title />

      <div className="flex flex-col gap-3 items-center mt-10">
        <div>
          <p className="text-sm text-[#50285a] font-light mb-1">
            <span className="text-red-700">*</span> Drug One
          </p>
          <Input
            placeholder="Enter first SMILES string"
            value={smiles1}
            onChange={(e) => setSmiles1(e.target.value)}
          />
        </div>
        <div>
          <p className="text-sm text-[#50285a] font-light mb-1">
            <span className="text-red-700">*</span> Drug Two
          </p>
          <Input
            placeholder="Enter second SMILES string"
            value={smiles2}
            onChange={(e) => setSmiles2(e.target.value)}
          />
        </div>

        {isValid === false && (
          <p className="text-red-500 text-xl font-semibold">
            Please enter a valid SMILES string
          </p>
        )}

        <div>
          <button
            className="py-1.5 px-2 bg-[#50285a] rounded-lg text-white text-sm min-w-[200px]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {" "}
            {loading ? "Predicting..." : "Submit"}
          </button>
        </div>
      </div>

       <div className="mx-auto mt-10 w-[500px]  text-[#50285a]">
    
        <ul className="list-disc">
        {result && (
            <li>{
              // eslint-disable-next-line array-callback-return
              interactionStatements.map((item) => {if(result[0] === item.code){
                return(
                  <>
                  <p>[{result}] {item.statement.replace(/#Drug1/g, smiles1).replace(/#Drug2/g, smiles2)}</p>
                  </>
  
                )
  
              }})
              } </li>
        )}
        </ul>
      </div>*
    </div>
  );
};

export default Index;

const Title = () => {
  return (
    <div>
      <div className="text-lg lg:text-4xl font-bold text-center text-[#50285a]">
        D.D.I. Detective
      </div>
      <p className="text-center text-base text-[#50285a]">
        Analyze drug-drug interaction in two simple steps
      </p>
      <p className="text-center text-sm italic text-[#50285a]">Predict. Prevent. Protect</p>
    </div>
  );
};

const Input = ({ placeholder, value, onChange }) => {
  return (
    <div className="w-[500px] min-w-[300px] bg-transparent border border-1 border-[#50285a]  rounded-[10px] shadow-md ">
      <input
        className="w-full rounded-[10px] bg-inherit border-0 outline-none placeholder:text-xs caret-[#50285a] focus:bg-white py-2 px-3 "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
