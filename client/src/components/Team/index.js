import React, { useState, useEffect } from "react";
import CreepyfaceRow from "./CreepyfaceRow";
import "./style.scss";
import "./pyro.scss";
import Layout from "../../containers/Layout";
import { motion } from "framer-motion";
import team from "./team.json";

const Team = () => {
    return (
        <Layout titlePage="Team">
            <motion.div
                className="team-div"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="team-container">
                    {/* Top div Gautier et Axel with animation */}
                    <motion.div
                        className="topDiv"
                        initial={{ x: "-100vw" }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.3, duration: 1.2 }}
                    >
                        <CreepyfaceRow teamMembers={[team.gautier, team.axel]} />
                    </motion.div>

                    {/* Ludovic with animation to work on */}
                    <motion.div
                        className=""
                        initial={{ scale: 2, opacity: 0.25, rotate: 360 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 3 }}
                    >
                        <CreepyfaceRow teamMembers={[team.ludovic]} />
                    </motion.div>

                    {/* Bottom div Sacha et Quentin with animation */}
                    <motion.div
                        className="botDiv"
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.3, duration: 1.2 }}
                    >
                        <CreepyfaceRow teamMembers={[team.sacha, team.quentin]} />
                    </motion.div>
                </div>
            </motion.div>
        </Layout>
    );
};
export default Team;
