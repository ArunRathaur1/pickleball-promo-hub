
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import  TournamentForm  from "@/components/tournaments/tournamentform/tournament-form";
import { LoggedNavbar } from "@/components/layout/loggednavbar";

const TournamentSubmit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Submit Your Tournament</h1>
            <p className="text-muted-foreground">
              Fill in the details below to submit your pickleball tournament for approval and promotion 
              on our platform. Our team will review your submission and get back to you shortly.
            </p>
          </div>
          
          <TournamentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TournamentSubmit;
