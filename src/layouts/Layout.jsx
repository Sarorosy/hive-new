import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const[contactFormOpen, setContactFormOpen] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setContactFormOpen(true);
    },8000)
  },[])
  return (
    <div className="min-h-screen flex flex-col w-full" >
      <Header onBookTourClick={()=> setContactFormOpen(true)} />
      <main className="flex-grow w-full pt-6" id="scroll-container">
        <div className="container m-0 max-w-[100%]">
          <Outlet context={{ setContactFormOpen }}  />
        </div>
      </main>
      <Footer />

      {contactFormOpen && (
        <ContactForm type="modal" onClose={()=>{setContactFormOpen(false)}} />
      )}
    </div>
  );
}
