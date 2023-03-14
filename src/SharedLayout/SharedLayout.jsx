import { Suspense } from 'react';
import { NavLink, Outlet } from "react-router-dom"
import s from '../SharedLayout/SharedLayout.module.css'
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  color: black;

    &.active {
    color: orange;
  }
`;

export const SharedLayout = () => {
    return (
        <>
            <div className={s.btn_nav}  >
              <button>
                <StyledLink to="/" >Home</StyledLink>
              </button>

              <button>
                <StyledLink to="/movies">Movies</StyledLink>
              </button>                
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
             <Outlet />
            </Suspense>
        </>     
    );
};