module.exports = {
  // Success
  SUCCESS: { "code": 200, "message": "성공" },
  SUCCESS_ADD_USER: { "code": 200, "message": "회원가입 성공" },
  SUCCESS_LOGIN: { "code": 200, "message": "로그인 성공" },
  SUCCESS_GET_POSTS: { "code": 200, "message": "게시글 목록 조회 성공" },
  SUCCESS_ADD_POSTS: { "code": 200, "message": "게시글 작성 성공" },
  SUCCESS_GET_POST: { "code": 200, "message": "게시글 상세 조회 성공" },
  SUCCESS_DELETE_POST: { "code": 200, "message": "게시글 삭제 성공" },
  SUCCESS_EDIT_POST: { "code": 200, "message": "게시글 수정 성공" },
  SUCCESS_ADD_COMMENT: { "code": 200, "message": "댓글 작성 성공" },
  SUCCESS_GET_COMMENTS: { "code": 200, "message": "댓글 조회 성공" },

  // Fail
  FAIL: { "code": 100, "message": "실패" },

  // Common
  TOKEN_EMPTY: { "code": 300, "message": "JWT 토큰을 입력해주세요." },
  TOKEN_VERIFICATION_FAILURE: { "code": 301, "message": "JWT 토큰 검증 실패" },
  TOKEN_VERIFICATION_SUCCESS: { "code": 302, "message": "JWT 토큰 검증 성공" },

  //Request / Response error
  VALUE_NOT_ENTERED: { "code": 400, "message": "입력되지 않은 값이 있습니다" },
  CHECK_INPUT_PARAMETER: { "code": 401, "message": "입력값을 확인해주세요" },
  ALREADY_EXISTS: { "code": 402, "message": "이미 존재하는 정보입니다" },
  NO_EXISTS: { "code": 403, "message": "존재하지 않는 정보입니다" },
  NO_EXISTS_POST: { "code": 403, "message": "존재하지 않는 정보입니다" },
  NO_PERMISSON_OR_INFO: { "code": 403, "message": "권한이 없거나 존재하지 않는 정보입니다" },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { "code": 501, "message": "데이터 베이스 에러" },
  SERVER_ERROR: { "code": 502, "message": "서버 에러" },
};
