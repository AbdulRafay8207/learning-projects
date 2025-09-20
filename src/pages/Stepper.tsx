import { useState } from "react"
import "../CSSpages/Stepper.css"

type Step1Props = {
    formData: FormData
    setFormData: (data:any) => void
    errors: {[key: string]: string}
}
type Step2Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: { [key: string]: string };
};
type Step3Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: { [key: string]: string };
};
type SummaryProps = {
    formData: FormData
}
type FormData = {
  name: string;
  age: string;
  email: string;
  phone: string
  color: string
  subscribe: boolean    
};


const Step1 = ({formData, setFormData, errors}: Step1Props)=>{
    return(
    <div>
        <h2>Step1: Personal Info</h2>
        <div style={{marginBottom: "12px"}}>
            <label>Name</label>
            <input 
                type="text" 
                value={formData.name || ""} 
                onChange={(e)=> setFormData({...formData, name: e.target.value})} 
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div style={{marginBottom: "12px"}}>
            <label>Age</label>
            <input 
                type="number" 
                value={formData.age || ""} 
                onChange={(e)=> setFormData({...formData, age: e.target.value})}
            />
                {errors.age && <p className="error-message">{errors.age}</p>}

        </div>
    </div>
    )
}
const Step2 = ({formData,setFormData,errors}: Step2Props)=>{
    return(
    <div>
        <h2>Step2: Contact Details</h2>
        <div style={{ marginBottom: "12px" }}>
            <label>Email</label>
            <input
            type="email"
            value={formData.email}
            onChange={(e)=> setFormData({...formData,email:e.target.value})} />
            {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div style={{marginBottom: '12px'}}>
            <label>Phone</label>
            <input
            type="tel"
            value={formData.phone}
            onChange={(e)=> setFormData({...formData, phone:e.target.value})} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
    </div>
    )
}
const Step3 = ({formData,setFormData,errors}:Step3Props)=>{
    return(
    <div>
        <h2>Step3: Preferences</h2>
        <div style={{ marginBottom: "12px" }}>
            <label>Favourite Color</label>
            <select 
            value={formData.color}
            onChange={(e)=> setFormData({...formData, color: e.target.value})}>
                <option value="">Select a color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
            </select>
            {errors.color && <p className="error-message">{errors.color}</p>}
        </div>
        <div style={{ marginBottom: "12px" }}>
            <label>
                <input 
                type="checkbox"
                checked={formData.subscribe}
                onChange={(e)=> setFormData({...formData, subscribe: e.target.checked})} />
                Subscribe to newsletter
            </label>
        </div>
    </div>
    )
}
const Summary = ({formData}:SummaryProps)=>{
    return(
    <div>
        <h2>Summary:</h2>
        <p><strong>Name:</strong>{formData.name}</p>
        <p><strong>Age:</strong>{formData.age}</p>
        <p><strong>Email:</strong>{formData.email}</p>
        <p><strong>Phone:</strong>{formData.phone}</p>
        <p><strong>Color:</strong>{formData.color}</p>
        <p><strong>Subscribed to Newsletter:</strong>{formData.subscribe? "Yes": "No"}</p>
    </div>
    )
}

const Stepper = ()=>{
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({name:"", age:"",email:"",phone:"",color:"",subscribe:false})
    const[errors, setErrors] = useState<{[key: string]: string}>({})

    const steps = [<Step1 formData={formData} setFormData={setFormData} errors={errors} />,
                    <Step2 formData={formData} setFormData={setFormData} errors={errors}/>,
                    <Step3 formData={formData} setFormData={setFormData} errors={errors}/>,
                    <Summary formData={formData}/>
                ]
    const stepTitles = ["Personal Info", "Contact Details", "Preferences", "Summary"]

    const handleNext = ()=>{
        let newErrors: { [key: string]: string } = {};
         if (currentStep === 0) {
            if (!formData.name) newErrors.name = "Name is required";
            if (!formData.age) newErrors.age = "Age is required";
        } else if (currentStep === 1) {
            if (!formData.email) newErrors.email = "Email is required";
            if (!formData.phone) newErrors.phone = "Phone is required";
        } else if (currentStep === 2) {
            if (!formData.color) newErrors.color = "Color is required";
  }

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            return
        }
        setErrors({})
            if(currentStep < steps.length - 1){
                setCurrentStep((prev)=> prev + 1)
            }
    }

    const handlePrevious = ()=>{
        if(currentStep > 0){
            setCurrentStep((prev)=> prev - 1)
        }
    }

    return(
        <div className="stepper-container">
            <div className="stepper-header">
                {stepTitles.map((title, index) => (
                    <div
                    key={index}
                    className={`stepper-step ${currentStep === index ? "active" : ""}`}
                    >{title}
                    </div>
                ))}
                </div>
                {steps[currentStep]}
            <div className="button-group">
                {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
                {currentStep < steps.length - 1? (
                    <button onClick={handleNext} style={{ marginLeft: "12px" }}>Next</button>
                ) : (
                    <button 
                    style={{ marginLeft: "12px" }}
                    onClick={()=>{
                        console.log("FormData",formData);
                        alert("Form Submitted! Check Console")
                    }}
                    >Submit</button>
                )}
            </div>
        </div>
    )
}
export default Stepper