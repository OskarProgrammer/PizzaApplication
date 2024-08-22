import { useState } from 'react'
import './App.css'

import { createBrowserRouter, 
          createRoutesFromElements, 
          Route, 
          RouterProvider} 
from 'react-router-dom'


//pages
import { HomeLayout, homeLayoutLoader } from './layouts/HomeLayout/HomeLayout'
import { HomePage, homePageLoader } from './pages/HomePage/HomePage'
import { loginAction, LoginPage } from './pages/LoginPage/LoginPage'
import { registrationAction, RegistrationPage } from './pages/RegistrationPage/RegistrationPage'
import { LogOutPage, logOutPageLoader } from './pages/LogOutPage/LogOutPage'
import { LogOutError } from './pages/LogOutPage/LogOutError'
import { basketAction, basketLoader, BasketPage } from './pages/BasketPage/BasketPage'
import { ordersLoader, OrdersPage } from './pages/OrdersPage/OrdersPage'
import { OrdersDetails, ordersDetailsLoader } from './pages/OrdersDetails/OrdersDetails'
import { AdminLayout, adminLayoutLoader } from './layouts/AdminLayout/AdminLayout'
import { usersListLoader, UsersPage } from './pages/UsersPage/UsersPage'
import { OrdersList, ordersListLoader } from './pages/OrdersList/OrdersList'
import { AdminError } from './pages/AdminError/AdminError'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>} loader={homeLayoutLoader}>
        <Route index element={<HomePage/>}
                      loader={homePageLoader}/>
        <Route  path="/loginPage" 
                element={<LoginPage/>} 
                action={loginAction}  />
        <Route  path="/registrationPage"
                element={<RegistrationPage/>}
                action={registrationAction} />
        <Route  path="/logOutPage" 
                element={<LogOutPage/>}
                loader={logOutPageLoader}
                errorElement={<LogOutError/>}/>
        <Route  path="/basketPage"
                element={<BasketPage/>}
                loader={basketLoader}
                action={basketAction}
                />
        <Route  path="/ordersPage"
                element={<OrdersPage/>}
                loader={ordersLoader}
                />
        <Route  path=":id"
                element={<OrdersDetails/>}
                loader={ordersDetailsLoader}
                errorElement={<AdminError/>}  
                /> 
        <Route  path="/adminPanel" 
                element={<AdminLayout/>}
                errorElement={<AdminError/>}
                loader={adminLayoutLoader}>
            <Route path="users" 
                   element={<UsersPage/>}
                   loader={usersListLoader}/>
            <Route path="orders" 
                   element={<OrdersList/>}
                   loader={ordersListLoader}/>
        </Route>
    </Route>
  ))


function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
