/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";

const Carousel = ({ data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Function to go to the next image
	const nextImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
	};
	// Function to go to the previous image
	const prevImage = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? data.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="relative w-[350px] h-[200px] rounded-t-lg flex align-middle justify-center items-center overflow-hidden border-1 border-solid border-black">
			<button>
				<IoIosHeartEmpty className="absolute size-7 p-1 bg-white rounded-full z-10 top-5 right-16 hover:border-2 hover:border-black solid box-border" />
			</button>
			<button>
				<IoShareSocialOutline className="absolute size-7 p-1 bg-white rounded-full z-10 top-5 right-5 hover:border-2 hover:border-black solid" />
			</button>
			{/* Display current image */}
			{data.length > 0 ? (
				<img src={data[currentIndex].image} className="w-[100%] h-[100%]" />
			) : (
				<p>No images available</p>
			)}

			{/* Navigation Buttons */}
			{data.length > 0 && (
				<>
					<button
						onClick={prevImage}
						className="absolute left-[10px] top-[70%] px-[6px] py-[4px] bg-[#b4b6b1] rounded-[5px]"
					>
						<IoIosArrowBack color="black" />
					</button>
					<button
						onClick={nextImage}
						className="absolute right-[10px] top-[70%] px-[6px] py-[4px] bg-[#b4b6b1] rounded-[5px]"
					>
						<IoIosArrowForward color="black" />
					</button>
				</>
			)}
		</div>
	);
};

export default Carousel;
