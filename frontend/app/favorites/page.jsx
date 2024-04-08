import PropertyListItem from "../components/properties/PropertyListItem";
import { getUserID } from "../lib/actions";
import { getProperties } from "../services/apiServices";


const FavoritesPage = async () => {
    const favorites = await getProperties("http://127.0.0.1:8000/api/properties/");
    const userId = await getUserID();
    const favoritesProperties = favorites.filter(
        (favorite) => favorite.favorited.includes(userId)
    );
    return (
        <div className="max-w-[1500px] mx-auto px-6  mb-4 grid gap-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                favoritesProperties.map((property) =>
                    <PropertyListItem
                        property={property}
                    />
                )
            }
        </div>
    )
}

export default FavoritesPage;