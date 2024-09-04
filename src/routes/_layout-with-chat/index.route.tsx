// import { Fragment, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
// import { useOverlay } from "@toss/use-overlay";
// import LoginModal from "@/components/LoginModal";
// import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
// import { ACCESS_TOKEN, REDIRECT_PATH, REFRESH_TOKEN } from "@/constants/auth";
// import MasonrySkeleton from "@/components/common/Fallback/MasonrySkeleton";
// const route = getRouteApi("/_layout-with-chat/");

// const PendingComponent = () => {
//   const navigate = useNavigate();
//   const { accessToken, refreshToken, redirect } = route.useSearch<{
//     accessToken: string;
//     refreshToken: string;
//     redirect: string;
//   }>();
//   const loginModalOverlay = useOverlay();

//   useEffect(() => {
//     if (accessToken && refreshToken) {
//       const redirectPath = getLocalStorage("redirect") as string;
//       setLocalStorage(ACCESS_TOKEN, accessToken);
//       setLocalStorage(REFRESH_TOKEN, refreshToken);

//       navigate({ to: redirectPath || "/" });
//     }
//     if (redirect) {
//       setLocalStorage(REDIRECT_PATH, redirect);
//       loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
//       navigate({ to: "/" });
//     }
//   });

//   return (
//     <Fragment>
//       <Helmet>
//         <title>짤뮤니티 | 나만을 위한 취향 저격 짤 추천</title>
//         <meta
//           name="description"
//           content="본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!"
//         />
//       </Helmet>
//       <MasonrySkeleton />
//     </Fragment>
//   );
// };

// export const Route = createFileRoute("/_layout-with-chat/")({
//   pendingComponent: PendingComponent,
// });
