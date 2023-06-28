"use client";

import Image from "next/image";

import {motion, AnimatePresence} from "framer-motion";
import {useSnapshot} from "valtio";
import state from "@/store";

import CustomButton from "@/components/CustomButton"

import threejslogo from "/public/threejs.png";

import {useRouter} from "next/navigation";


import {
    headContentAnimation,
    headContainerAnimation,
    headTextAnimation,
    slideAnimation
} from "@/config/motion";

export default function Home() {
    const snap = useSnapshot(state);

    const router = useRouter();

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className={"home"} {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <Image
                            alt={"threejs logo"}
                            width={60}
                            height={60}
                            className={"w-8 h-8 object-contain"}
                            src={threejslogo}
                        />
                    </motion.header>

                    <motion.div className={"home-content"} {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className={"head-text"}>
                                LET&apos;S <br className={"xl:block hidden"}/> DO IT.
                            </h1>
                            <motion.div
                                {...headContentAnimation}
                                className={"flex flex-col gap-5"}
                            >
                                <p className={"max-w-md font-normal text-gray-600 text-base"}>
                                    Create your unique and exclusive shirt with our brand-new 3D customization
                                    tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                                </p>

                                <CustomButton
                                    type={"filled"}
                                    title={"Customize it"}
                                    handleClick={() => {
                                        state.intro = false
                                        setTimeout(() => {
                                            router.push("/customizer")
                                        }, 500)
                                    }}
                                    customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}
