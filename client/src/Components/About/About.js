import React from 'react'

import cls from '../Profile/Profile.module.sass'
import comp from '../Companies/Companies.module.sass'
import icons from '../../styles/style.module.css'
import Feed from '../../fonts/feed.svg'
import Like from '../../fonts/like.svg'
import { AppWrapper } from '../../App.module.sass'
import marked from 'marked'
import { NavLink } from 'react-router-dom'

function About({ location }) {
  const { state } = location
  return (
    <div className={AppWrapper}>
      <div className={cls.Profile}>
        <h1>
          Профиль компании
          {state.name}
        </h1>

        <hr />
        <div
          className={cls.ContentWrapper}
          style={{ marginTop: '30px', alignItems: 'center' }}
        >
          <img src={state.image} width={550} />
          <div className={cls.TextContent}>
            <div className={cls.TextTitle}>
              <h2 style={{ fontSize: '45px' }}>О нас</h2>
              <div className={cls.Stats}>
                <span>
                  {state.posts}&nbsp; <img srcSet={Feed} />{' '}
                </span>
                <span>
                  {state.likes}&nbsp;
                  <img srcSet={Like} />{' '}
                </span>
              </div>
            </div>
            <div
              className={cls.Desc}
              style={{ border: 'none' }}
              dangerouslySetInnerHTML={{
                __html: marked(state.desc ?? ''),
              }}
            ></div>
          </div>
        </div>
        <h2 style={{ textAlign: 'left' }}>Наши проекты</h2>
        <div className={cls.Projects + ' ' + comp.Companies}>
          {state.projects.map((project, index) => {
            return (
              <div className={comp.Company + ' ' + cls.Project}>
                <div className={comp.CompanyImage + ' ' + cls.ProjectImage}>
                  <img srcSet={`/companies/${index + 1}.png`} />
                  <div className={comp.CompanyStats}>
                    <div style={{ marginLeft: 'auto' }}>
                      <span className={comp.CompanyCount}>{project.likes}</span>
                      <img srcSet={Like} alt={'Feed'} />
                    </div>
                  </div>
                </div>

                <div className={comp.CompanyContent + ' ' + cls.ProjectContent}>
                  <h3 className={comp.CompanyName}>{project.name}</h3>
                  <div
                    className={comp.CompanyDesc}
                    dangerouslySetInnerHTML={{
                      __html: marked(project.desc),
                    }}
                  ></div>
                  <NavLink
                    to={{
                      pathname: `/projects/${project.id}`,
                      state: {
                        name: project.name,
                        desc: project.desc,
                        image: `/companies/${index + 1}.png`,
                        likes: project.likes,
                      },
                    }}
                  >
                    Смотреть
                  </NavLink>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default About
