// import { Fragment, useRef } from "react";
// import { Helmet } from "react-helmet-async";
// import { createLazyFileRoute } from "@tanstack/react-router";
// import ReportTableHead from "@/components/common/admin/ReportTableHead";
// import ReportsTableBody from "@/components/AdminReports/ReportsTableBody ";
// import useGetReports from "@/hooks/api/report/useGetReports";
// import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

// const Admin = () => {
//   const fetchMoreRef = useRef(null);
//   const { reports, handleFetchNextPage } = useGetReports();

//   useIntersectionObserver({
//     target: fetchMoreRef,
//     handleIntersect: handleFetchNextPage,
//   });

//   return (
//     <Fragment>
//       <Helmet>
//         <title>관리자 - 짤뮤니티</title>
//         <meta name="description" content="짤뮤니티 관리자 페이지입니다" />
//       </Helmet>
//       <div className="flex h-full w-full flex-col items-center overflow-auto p-45pxr">
//         <div className="flex w-5/6 flex-col">
//           <div className="breadcrumbs overflow-hidden pb-20pxr text-lg font-bold">
//             <ul>
//               <li>
//                 <h1>신고 내역</h1>
//               </li>
//             </ul>
//           </div>
//           <div className="flex flex-col">
//             <table className="table overflow-hidden">
//               <ReportTableHead>
//                 <ReportTableHead.Th>Date</ReportTableHead.Th>
//                 <ReportTableHead.Th>이미지 제목</ReportTableHead.Th>
//                 <ReportTableHead.Th>신고 횟수</ReportTableHead.Th>
//                 <ReportTableHead.Th>게시물 상세보기</ReportTableHead.Th>
//               </ReportTableHead>
//               <ReportsTableBody reports={reports} />
//             </table>
//             <div ref={fetchMoreRef} />
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export const Route = createLazyFileRoute("/_authentication/admin/reports")({
//   component: Admin,
// });
