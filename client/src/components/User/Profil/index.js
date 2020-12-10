import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";

/* Components */
import { Segment, Image, Icon, Placeholder } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

/* Containers */
import Layout from "../../../containers/Layout";
import Irecords from "../../../containers/Irecords";
import UpdateAvatar from "../../../containers/User/UpdateAvatar";
import ProfilSearch from "../../../containers/User/ProfilSearch";
import Follow from "../../../containers/User/Follow";
import Statistics from "../../../containers/User/statistics";

/* Style */
import "./userprofil.scss";

const UserProfil = (props) => {
  const {
    currentUser,
    editProfilAvatar,
    checkUserSlug,
    userSlugInfos,
    emptyCheckUserSlug,
    checkUserSlugLoading,
    userSlugUndefined,
  } = props;

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
    followers,
    followed,
  } = userSlugInfos;

  const [slugName, setSlugName] = useState({});

  let slug = useParams();

  useEffect(() => {
    checkUserSlug(slug.slug);
    return () => {
      emptyCheckUserSlug();
    };
  }, [slug.slug, checkUserSlug]);

  useEffect(() => {
    if (slug.slug === userSlugInfos.slug) {
      setSlugName({
        firstname: userSlugInfos.firstname,
        lastname: userSlugInfos.lastname,
      });
    }
  }, [userSlugInfos]);

  useEffect(() => {
    document.title = `iTongue - ${
      slugName.firstname ? slugName.firstname + " " + slugName.lastname : ""
    }`;
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
        (!inputSearch.lang ||
          record.translation.language.id === inputSearch.lang)
      );
    });

  const RecordPlaceholder = () => {
    const array = [1, 2, 3];
    return array.map((i) => (
      <div className="profil-records_placeholder" key={i}>
        <Placeholder fluid>
          <Placeholder.Header image>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="medium" />
          </Placeholder.Header>
        </Placeholder>
      </div>
    ));
  };

  return (
    <Layout>
      <ToastContainer autoClose={2000} />

      {!currentUser && !userSlugInfos.slug && <Redirect to={`/`} />}

      <div className="user-profil">
        <Segment className="user-profil_header">
          {/* <ProfilPlaceholder /> */}
          <div className="container_left">
            <div className="container_left__container">
              {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              ) : (
                <UpdateAvatar
                  avatarUrl={avatarUrl}
                  isUserAccount={isUserAccount}
                  editProfilAvatar={editProfilAvatar}
                />
              )}
            </div>
            {!userSlugUndefined && <Follow userSlugInfos={userSlugInfos} />}
          </div>
          <div className="container_right">
            {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
              <Placeholder>
                <Placeholder.Line length="full" />
              </Placeholder>
            ) : (
              <div className="container_right__first-row">
                <span className="user-title">
                  {userSlugUndefined ? "Unknown" : firstname}{" "}
                  {userSlugUndefined ? "user" : lastname}
                </span>

                {isAdmin && <Icon name="check circle" />}
                {isUserAccount && currentUser ? (
                  <Link to={`/user/${slug.slug}/edit`}>
                    <Icon
                      name="setting"
                      style={{ color: "#fe734c" }}
                      className="icon-settings"
                    />
                  </Link>
                ) : (
                  !userSlugUndefined && (
                    <Link to={`/messages/${slug.slug}/${userSlugInfos.id}`}>
                      <Icon
                        name="send"
                        style={{ color: "#fe734c" }}
                        className="icon-message"
                      />
                    </Link>
                  )
                )}
              </div>
            )}

            {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
              <Placeholder>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder>
            ) : (
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
                  </div>
                </div>
              </div>
            )}
            {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
              <Placeholder>
                <Placeholder.Line length="full" />
              </Placeholder>
            ) : (
              <div className="container_right__third-row">
                <Statistics
                  userId={id}
                  userSlug={userSlugInfos.slug}
                  totalRecords={records ? records.length : 0}
                  totalFollower={followers ? followers.length : 0}
                  totalFollowed={followed ? followed.length : 0}
                />
              </div>
            )}
          </div>
        </Segment>

        <div className="container_bio">
          {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
            <Placeholder>
              <Placeholder.Line length="full" />
            </Placeholder>
          ) : (
            bio && (
              <p>
                <strong>« </strong> {bio} <strong> »</strong>
              </p>
            )
          )}
        </div>

        <div className="user-profil_feed">
          <ProfilSearch
            records={records}
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
          />
          {checkUserSlugLoading && userSlugInfos && !userSlugUndefined ? (
            <RecordPlaceholder />
          ) : filteredRecords && filteredRecords.length ? (
            filteredRecords.map((audio, key) => (
              <Irecords
                key={key}
                record={audio}
                user={userSlugInfos}
                isUserRecord={id}
              />
            ))
          ) : (
            <>
              <div className="user-profil_feed__norecords">
                <Icon name="microphone slash" size="big" circular />
                <div className="norecords-informations">Aucun iRecord.</div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default UserProfil;
