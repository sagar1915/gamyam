/* eslint-disable react/prop-types */

import Carousel from "./Carousel";

const Card = ({ data }) => {
	return (
		<div className="gap-2 shadow-lg rounded-b-lg  hover:shadow-2xl">
			<div>
				<Carousel data={data?.land_media} />
			</div>
			<div className="p-2">
				<div className="font-bold">
					{data.total_land_size_in_acres.acres ? (
						<>
							<span>
								&#8377; {formatPrice(data?.price_per_acre_crore)} / acre
							</span>
							<span className="font-bold">
								{" "}
								· {data.total_land_size_in_acres.acres} acres
								{data.total_land_size_in_acres.guntas
									? ` ${data.total_land_size_in_acres.guntas} guntas`
									: ""}
							</span>
						</>
					) : (
						<>
							<span>
								&#8377; {formatPrice(data?.price_per_acre_crore)} for full
								property
							</span>{" "}
							·{" "}
							{data.total_land_size_in_acres.guntas
								? ` ${data.total_land_size_in_acres.guntas} guntas`
								: ""}
						</>
					)}
				</div>

				<div className="text-gray-600 text-sm">
					<span>
						<span>{data?.division_info[3]?.name}</span>,
						<span> {data?.division_info[1]?.name} (dt)</span>
					</span>
				</div>
			</div>
		</div>
	);
};

const formatPrice = (price) => {
	const crore = price?.crore || 0; // Default to 0 if `crore` is not available
	const lakh = price?.lakh || 0; // Default to 0 if `lakh` is not available

	if (crore > 0) {
		// Convert lakhs to crores and combine with crore value
		const totalCrores = crore + lakh / 100;
		return `${totalCrores.toFixed(1)} Cr`;
	} else if (lakh > 0) {
		// If only lakhs exist, display in lakhs
		return `${lakh} lakhs`;
	}

	// Fallback if neither crores nor lakhs are available
	return "0";
};

export default Card;
