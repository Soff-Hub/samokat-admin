import AppRoute from 'components/route/AppRoute'
import Loader from 'components/shared/loader'
import { adminRoutes, authRoutes } from 'configs/routes.config/routes'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'

export default function Views() {

  const { isLoginning } = useSelector(state => state.admin)
  const navigate = useNavigate()


  useEffect(() => {
    if (!isLoginning) {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [isLoginning])

  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        {
          isLoginning ? (
            adminRoutes.map(route => {
              return <Route key={route.key} path={route.path} element={<AppRoute component={route.component} />} />
            })
          ) : (
            authRoutes.map(route => {
              return <Route key={route.key} path={route.path} element={<AppRoute component={route.component} />} />
            })
          )
        }
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </Suspense>
  )
}

