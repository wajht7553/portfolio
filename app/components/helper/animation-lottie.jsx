"use client";
import Lottie from "lottie-react";

/**
 * AnimationLottie component renders a Lottie animation.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.animationPath - The path to the animation data.
 * @param {string} props.width - The width of the animation.
 * @returns {JSX.Element} The rendered Lottie animation.
 */
const AnimationLottie = ({ animationPath, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: "95%",
    },
  };

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;
