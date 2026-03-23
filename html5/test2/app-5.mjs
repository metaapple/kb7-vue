// import { goodbye } from './goodbye-1.mjs';

// goodbye('홍길동');

// import { hi, goodbye } from './greeting-1.mjs';

// hi('홍길동');
// goodbye('홍길동');

// import { goodbye as bye } from './goodbye-1.mjs';

// bye('홍길동');

// import { hi as hello, goodbye as bye } from './greeting-1.mjs';

// hello('홍길동');
// bye('홍길동');

import * as say from './greeting-1.mjs'; // greeting.mjs에서 내보낸 함수들을 한꺼번에 say로 받기

say.hi('홍길동');
say.goodbye('홍길동');
