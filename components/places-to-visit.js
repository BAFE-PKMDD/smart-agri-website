import Image from "next/image";

const PLACES = [
  {
    name: "Underground River",
    image: "/images/places/underground-river.png",
    description:
      "A UNESCO World Heritage Site — explore one of the world's longest navigable underground rivers through a stunning limestone cave.",
    tag: "Must Visit",
    distance: "~80 km from city",
  },
  {
    name: "Honda Bay",
    image: "/images/places/honda-bay.png",
    description:
      "Island-hop across crystal-clear turquoise waters, snorkel over coral reefs, and relax on pristine white sand beaches.",
    tag: "Island Hopping",
    distance: "~20 km from city",
  },
  {
    name: "Baker's Hill",
    image: "/images/places/bakers-hill.jpg",
    description:
      "A colorful hilltop garden park with European-inspired architecture, panoramic views, and famous hopia and pastries.",
    tag: "Family Friendly",
    distance: "~10 km from city",
  },
  {
    name: "Nagtabon Beach",
    image: "/images/places/nagtabon-beach.png",
    description:
      "A secluded paradise with powder-white sand, swaying palms, and calm turquoise waters — perfect for a quiet escape.",
    tag: "Beach",
    distance: "~25 km from city",
  },
  {
    name: "Mitra's Ranch",
    image: "/images/places/mitras-ranch.png",
    description:
      "A scenic hilltop viewpoint offering sweeping panoramic views of the city, Honda Bay, and surrounding mountain ranges.",
    tag: "Scenic View",
    distance: "~8 km from city",
  },
  {
    name: "Ugong Rock Adventures",
    image: "/images/places/ugong-rock.png",
    description:
      "Spelunk through ancient caves and zip-line across the jungle canopy at this thrilling limestone rock formation.",
    tag: "Adventure",
    distance: "~75 km from city",
  },
];

export default function PlacesToVisit() {
  return (
    <section className="section" id="places">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Explore Palawan</span>
          <h2 className="section__title">
            Places to Visit in Puerto Princesa
          </h2>
          <p className="section__subtitle">
            Make the most of your trip! Discover the stunning natural wonders
            and attractions near the training venue.
          </p>
        </div>

        <div className="places__grid">
          {PLACES.map((place, i) => (
            <div
              key={place.name}
              className={`place-card fade-in fade-in-delay-${(i % 3) + 1}`}
            >
              <div className="place-card__img-wrap">
                <Image
                  src={place.image}
                  alt={place.name}
                  width={600}
                  height={400}
                  className="place-card__img"
                />
                <span className="place-card__tag">{place.tag}</span>
              </div>
              <div className="place-card__body">
                <h3 className="place-card__name">{place.name}</h3>
                <p className="place-card__desc">{place.description}</p>
                <span className="place-card__distance">
                  📍 {place.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
