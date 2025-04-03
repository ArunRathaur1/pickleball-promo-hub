import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface Athlete {
  _id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
  height: number;
  points: number;
  DUPRID: string;
  sponsors: { name: string; imageUrl: string }[];
  instagramPage?: string;
  titlesWon: { title: string; year: number }[];
  relatedContent: { imageUrl: string; title: string; youtubeLink: string }[];
  imageUrl: string;
}

const Playerprofile = () => {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/athletes/${id}`)
      .then((res) => {
        setAthlete(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Athlete not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Athlete Image */}
          <div className="md:w-1/3">
            <img src={athlete?.imageUrl} alt={athlete?.name} className="w-full rounded-lg shadow-lg" />
          </div>

          {/* Athlete Details */}
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold">{athlete?.name}</h1>
            <p><strong>Age:</strong> {athlete?.age}</p>
            <p><strong>Gender:</strong> {athlete?.gender}</p>
            <p><strong>Country:</strong> {athlete?.country}</p>
            <p><strong>Height:</strong> {athlete?.height} cm</p>
            <p><strong>Points:</strong> {athlete?.points}</p>
            <p><strong>DUPRID:</strong> {athlete?.DUPRID}</p>

            {/* Instagram Link */}
            {athlete?.instagramPage && (
              <p>
                <a
                  href={athlete.instagramPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Instagram Profile
                </a>
              </p>
            )}

            {/* Sponsors */}
            {athlete?.sponsors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4">Sponsors:</h2>
                <div className="flex gap-4">
                  {athlete.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img src={sponsor.imageUrl} alt={sponsor.name} className="w-16 h-16 rounded-full" />
                      <p>{sponsor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Titles Won */}
            {athlete?.titlesWon.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4">Titles Won:</h2>
                <ul className="list-disc list-inside">
                  {athlete.titlesWon.map((title, index) => (
                    <li key={index}>{title.title} ({title.year})</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Content */}
            {athlete?.relatedContent.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4">Related Content:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {athlete.relatedContent.map((content, index) => (
                    <div key={index} className="bg-muted p-4 rounded-lg">
                      <img src={content.imageUrl} alt={content.title} className="w-full rounded-lg mb-2" />
                      <p className="font-semibold">{content.title}</p>
                      <a
                        href={content.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Watch Video
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Playerprofile;
