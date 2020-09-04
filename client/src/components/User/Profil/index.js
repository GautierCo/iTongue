import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "../../../containers/Layout";
import Irecords from "../../../containers/Irecords";
import UpdateAvatar from "../../../containers/User/UpdateAvatar";
import ProfilSearch from "../../../containers/User/ProfilSearch";
import Follow from "../../../containers/User/Follow";

/* Components */
import { Segment, Image, Icon, Placeholder } from "semantic-ui-react";
import Statistics from "../Statistics";

/* Style */
import "./userprofil.scss";
import ProfilPlaceholder from "../../Placeholder/profilPlaceHolder";

const UserProfil = ({ currentUser, editProfilAvatar, checkUserSlug, userSlugInfos, emptyCheckUserSlug }) => {
    
    const [isUserAccount, setIsUserAccount] = useState(false);
    
    const [inputSearch, setInputSearch] = useState({ search: "", lang: null });
    
    const {
        id,
        avatarUrl,
        firstname,
        lastname,
        isAdmin,
        bio,
        records,
        learnedLanguages,
        taughtLanguages,
        checkUserSlugLoading,
        followers,
        followed,
    } = userSlugInfos;

    const [slugName, setSlugName] = useState({});

    let slug = useParams();

    useEffect(() => {
        checkUserSlug(slug.slug);
        /*
        return () => {
            emptyCheckUserSlug();
        }
        */
    }, [slug.slug, checkUserSlug]);

    useEffect(() => {
        if(slug.slug === userSlugInfos.slug) {
            setSlugName({
                firstname: userSlugInfos.firstname,
                lastname: userSlugInfos.lastname,
            })
        }
    }, [userSlugInfos])

    
    useEffect(() => {
        document.title = `iTongue - ${slugName.firstname ? slugName.firstname + " " + slugName.lastname : ""}`;
    }, [slugName]);

    useEffect(() => {
        const checkUser = () => {
            if (currentUser.slug === slug.slug) {
                setIsUserAccount(true);
            } else {
                setIsUserAccount(false);
            }
        };
        checkUser();
    }, [slug.slug, currentUser.slug]);

    const filteredRecords =
        records &&
        records.filter((record) => {
            const regexp = new RegExp(inputSearch.search, "i");
            return (
                (regexp.test(record.translation.text) ||
                    regexp.test(record.englishTranslation.text)) &&
                (!inputSearch.lang || record.translation.language.id === inputSearch.lang)
            );
        });

    return (
        <Layout>
            <ToastContainer autoClose={2000} />
            {currentUser.slug && !userSlugInfos.slug && (
                <Redirect to={`/user/${currentUser.slug}`} />
            )}
            {!currentUser && !userSlugInfos.slug && <Redirect to={`/`} />}

            <div className="user-profil">
                <Segment className="user-profil_header">
                    {/* <ProfilPlaceholder /> */}
                    <div className="container_left">
                        <div className="container_left__container">
                            {checkUserSlugLoading ? 
                                <Placeholder>
                                    <Placeholder.Image/>
                                </Placeholder>
                                :
                                <UpdateAvatar
                                avatarUrl={avatarUrl}
                                isUserAccount={isUserAccount}
                                editProfilAvatar={editProfilAvatar}
                                checkUserSlugLoading={checkUserSlugLoading}
                            />
                            }
                        </div>
                        <Follow userSlugInfos={userSlugInfos} />
                    </div>
                    <div className="container_right">
                        {checkUserSlugLoading ? 
                                <Placeholder>
                                    <Placeholder.Line length="full"/>
                                </Placeholder>
                            :
                                <div className="container_right__first-row">
                                
                                    <span className="user-title">
                                        {firstname || "Utilisateur"} {lastname || "Inconnu"}
                                    </span>
                                
                                    {isAdmin && <Icon name="check circle" />}
                                    {isUserAccount && currentUser ?
                                        <Link to={`/user/${slug.slug}/edit`}>
                                            <Icon
                                                name="setting"
                                                style={{ color: "#fe734c" }}
                                                className="icon-settings"
                                            />
                                        </Link>
                                        :
                                        <Link to={`/messages/${slug.slug}/${userSlugInfos.id}`}>
                                        <Icon
                                            name="send"
                                            style={{ color: "#fe734c" }}
                                            className="icon-message"
                                        />
                                        </Link>
                                    }
                                </div>
                            }

                        {checkUserSlugLoading ? 
                                <Placeholder>
                                    <Placeholder.Line length="full"/>
                                </Placeholder>
                            :
                            <div className="container_right__second-row">
                                <div className="second-row_iteach">
                                    <div className="title">iTeach</div>
                                    <div className="flags">
                                    
                                        {taughtLanguages &&
                                        taughtLanguages.map(
                                            (language, index) =>
                                                index < 4 && (
                                                    <Image
                                                        key={index}
                                                        src={`https://www.countryflags.io/${language.code}/flat/32.png`}
                                                        className="flag_image"
                                                    />
                                                )
                                        )}
                                    </div>
                                </div>
                            <div className="second-row_ilearn">
                                <div className="title">iLearn</div>
                                <div className="flags">
                                    {learnedLanguages &&
                                        learnedLanguages.map(
                                            (language, index) =>
                                                index < 4 && (
                                                    <Image
                                                        key={index}
                                                        src={`https://www.countryflags.io/${language.code}/flat/32.png`}
                                                        className="flag_image"
                                                    />
                                                )
                                        )}
                                    <Placeholder>
                                        <Placeholder.Line length="full"/>
                                    </Placeholder>
                                </div>
                            </div>
                        </div>
                        }
                        {checkUserSlugLoading ? 
                                <Placeholder>
                                    <Placeholder.Line length="full"/>
                                </Placeholder>
                            :
                        <div className="container_right__third-row">
                            <Statistics
                                totalRecords={records ? records.length : 0}
                                totalFollower={followers ? followers.length : 0}
                                totalFollowed={followed ? followed.length : 0}
                            />
                        </div>
                        }
                    </div>
                </Segment>
                
                    <div className="container_bio">
                        {checkUserSlugLoading ? 
                            <Placeholder>
                                <Placeholder.Line length="full"/>
                            </Placeholder>
                        :
                            bio && (
                                <p>
                                    <strong>« </strong> {bio} <strong> »</strong>
                                </p>
                            )
                        }
                    </div>
                
                <div className="user-profil_feed">
                    <ProfilSearch
                        records={records}
                        inputSearch={inputSearch}
                        setInputSearch={setInputSearch}
                    />
                    {filteredRecords && filteredRecords.length ? 
                        filteredRecords.map((audio, key) => (
                            <Irecords
                                key={key}
                                record={audio}
                                user={userSlugInfos}
                                isUserRecord={id}
                            />
                        ))
                    :  (
                            <>
                                <div className="user-profil_feed__norecords">
                                    <Icon
                                        name="microphone slash"
                                        size="big"
                                        circular
                                    />
                                    <div className="norecords-informations">
                                        Aucun iRecord.
                                    </div>
                                </div>
                            </>
                    )}
                </div>
            </div>
        </Layout>
    );
};
export default UserProfil;
