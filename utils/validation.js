/**
 * @file validation.js
 * @description 유효성 검사 로직을 분리하여 관리하는 유틸리티 파일입니다.
 */

/**
 * 고객 등록 데이터의 유효성을 검사합니다.
 * @param {Object} data - 검사할 고객 데이터
 * @returns {Object} - { isValid: boolean, error: string | null }
 */
export const validateCustomerData = (data) => {
  if (!data.name || data.name.trim() === '') {
    return { isValid: false, error: '고객명은 필수 입력 항목입니다.' };
  }

  if (!data.phone || !/^010-\d{3,4}-\d{4}$/.test(data.phone)) {
    return { isValid: false, error: '올바른 연락처 형식(010-0000-0000)이 아닙니다.' };
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { isValid: false, error: '올바른 이메일 형식이 아닙니다.' };
  }

  return { isValid: true, error: null };
};

/**
 * 대량 등록 파일의 초기 유효성을 검사합니다.
 * @param {File} file - 업로드된 파일 객체
 * @returns {Object} - { isValid: boolean, error: string | null }
 */
export const validateBulkFile = (file) => {
  const allowedExtensions = ['xlsx', 'xls', 'csv'];
  const extension = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return { isValid: false, error: '지원되지 않는 파일 형식입니다. (xlsx, xls, csv 가능)' };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { isValid: false, error: '파일 크기는 5MB를 초과할 수 없습니다.' };
  }

  return { isValid: true, error: null };
};
