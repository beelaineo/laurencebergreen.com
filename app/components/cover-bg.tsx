interface BookCoverBGProps {
  color?: string
}

const BookCoverBG = ({ color }: BookCoverBGProps) => (
  <>
  <style jsx>{`
    svg {
      position: absolute;
      z-index: -1;
      height: 100%;
      width: 100%;
    }
  `}</style>
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2235 3357"><path fill={color} className="cls-1" d="m1994.7064,3357h-10.0122c-1.8998-1.7096-4.3247-1.5262-6.615-1.8395-11.8859-1.6268-23.7778-3.2116-35.655-4.9007-26.7208-3.7989-53.4291-7.6848-80.1516-11.4708-24.7434-3.5059-49.5034-6.895-74.2476-10.3955-26.7226-3.7804-53.4333-7.6441-80.1527-11.4472-26.0583-3.7091-52.12-7.3964-78.1824-11.0767-20.7854-2.9354-41.573-5.8551-62.3621-8.7646-21.12-2.9559-42.2486-5.8497-63.3629-8.8459-26.7217-3.7916-53.4282-7.6924-80.1501-11.4843-20.1241-2.856-40.2671-5.5777-60.3924-8.4253-26.7215-3.7814-53.4304-7.6524-80.1514-11.4376-25.4035-3.5987-50.8194-7.1109-76.223-10.7096-25.7302-3.6448-51.4467-7.3857-77.1789-11.0161-21.4465-3.0257-42.914-5.9027-64.3592-8.9382-26.7231-3.7831-53.4276-7.6975-80.1498-11.4879-20.1244-2.8548-40.2696-5.563-60.3951-8.4104-26.7204-3.7806-53.4267-7.6612-80.1464-11.4472-25.4036-3.5994-50.8208-7.1033-76.2244-10.7028-25.73-3.6456-51.4452-7.3952-77.1771-11.0271-21.4469-3.0272-42.9158-5.8978-64.3614-8.9338-26.7231-3.7833-53.4264-7.7061-80.1491-11.4926-24.7434-3.5064-49.5054-6.8811-74.2512-10.3708-27.3829-3.8612-54.7564-7.7894-82.1344-11.6853-25.3993-3.6143-50.7981-7.2316-76.1991-10.8339-25.4013-3.6023-50.8032-7.2008-76.2081-10.7772-21.4483-3.0191-42.9062-5.9696-64.3509-9.0139-25.4006-3.6053-50.7855-7.3214-76.1885-10.9099-25.7356-3.6358-51.5076-7.0237-77.2079-10.8903-4.8084-.7234-10.0242-.4096-13.9056-2.7195-1.8959-2.2716-1.7791-4.3267-1.8286-6.2974-.2344-9.328-.5614-18.6575-.581-27.9867-.063-30.0047.1428-60.0104-.0183-90.0142-.9-167.6659,1.5773-335.3401-1.339-503.0013-.3362-19.3301.0522-38.6716.0271-58.008-.2231-171.6905-.5042-343.3807-.6834-515.0712-.1023-98.0156.2034-196.0323-.1326-294.0469-.3371-98.3339.9803-196.6674-.9332-295.0056-1.1024-56.6551-.3802-113.3467-.3945-170.0218-.0317-126.0203-.0006-252.0406-.0344-378.0608-.002-7.3283-.3539-14.6564-.543-21.9846.1185-4.6633.3406-9.3267.3395-13.99-.0115-47.6791-.0865-95.3582-.0917-143.0372-.0149-135.369-.0084-270.738.0079-406.107.0005-4.3306.199-8.6612.3052-12.9918,3.8544-1.9825,7.7329-3.9195,11.5595-5.9541C93.1195,90.8987,174.1532,47.8949,255.0405,4.618c7.4714-3.9974,14.663-5.3381,22.9585-4.2604,16.8617,2.1907,33.8031,3.7709,50.7147,5.5737,14.924,1.5909,29.8543,3.1221,44.7779,4.7157,21.8856,2.3371,43.7639,4.7419,65.6523,7.0519,21.8909,2.3103,43.7946,4.4997,65.6849,6.8154,22.2191,2.3505,44.4246,4.8293,66.6435,7.1808,21.8894,2.3167,43.7912,4.5165,65.6821,6.8186,23.5484,2.4764,47.0895,5.0209,70.6356,7.5187,14.593,1.548,29.1914,3.0463,43.784,4.5988,22.5496,2.399,45.0946,4.8428,67.6451,7.2339,15.2563,1.6177,30.522,3.1474,45.7779,4.7702,22.2173,2.3634,44.427,4.7968,66.6445,7.1589,15.5879,1.6573,31.1861,3.2191,46.7746,4.8707,22.2193,2.3542,44.432,4.7718,66.6516,7.1238,15.5885,1.6501,31.1872,3.2039,46.7752,4.8583,22.2187,2.3581,44.429,4.7939,66.648,7.1488,15.5883,1.6521,31.1887,3.1873,46.7768,4.8417,22.2187,2.358,44.4277,4.8063,66.6465,7.1623,21.558,2.286,43.1264,4.4731,64.6841,6.761,22.2188,2.358,44.4259,4.8278,66.6463,7.1699,21.8911,2.3074,43.7995,4.4506,65.6877,6.7845,27.8545,2.9701,55.6899,6.1194,83.5456,9.0783,22.2204,2.3603,44.4677,4.4693,66.6872,6.8363,34.1567,3.6387,68.2917,7.4789,102.4509,11.0928,34.824,3.6842,69.6741,7.1236,104.4982,10.8078,34.4901,3.6489,68.9544,7.5442,103.4445,11.1942,34.8245,3.6854,69.6747,7.129,104.4993,10.8136,34.4903,3.6493,68.9591,7.4989,103.4437,11.2018,32.4953,3.4893,64.9986,6.902,97.4985,10.3484v2925.0325c-2.6685.8756-4.2628,3.1241-6.1965,4.9134-7.826,7.2418-15.5881,14.5525-23.3992,21.8109-68.1005,63.2848-136.2111,126.5593-204.2939,189.8634-2.4058,2.2369-5.3058,4.1133-6.4039,7.4914Z"/></svg>
  </>
)

export default BookCoverBG