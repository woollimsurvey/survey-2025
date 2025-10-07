"use client";

import { useEffect, use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Gap({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter, settingMonth, setSettingMonth } =
    useForm();

  const handlePrev = () => {
    setSettingMonth(true);

    router.push(`/${number}/level`);
  };

  const handleNext = () => {
    setSettingMonth(true);

    router.push(`/${number}/skill`);
  };

  useEffect(() => {
    if (!settingMonth) {
      setCheckedInter((prevInter) =>
        prevInter.map((inter) => {
          if (inter.country === "kr")
            return {
              ...inter,
              krMonth: "0",
              usMonth: "",
              cnMonth: "",
              jpMonth: "",
              euMonth: "",
              etcMonth: 0,
            };
          if (inter.country === "us")
            return {
              ...inter,
              krMonth: "",
              usMonth: "0",
              cnMonth: "",
              jpMonth: "",
              euMonth: "",
              etcMonth: 0,
            };
          if (inter.country === "cn")
            return {
              ...inter,
              krMonth: "",
              usMonth: "",
              cnMonth: "0",
              jpMonth: "",
              euMonth: "",
              etcMonth: 0,
            };
          if (inter.country === "jp")
            return {
              ...inter,
              krMonth: "",
              usMonth: "",
              cnMonth: "",
              jpMonth: "0",
              euMonth: "",
              etcMonth: 0,
            };
          if (inter.country === "eu")
            return {
              ...inter,
              krMonth: "",
              usMonth: "",
              cnMonth: "",
              jpMonth: "",
              euMonth: "0",
              etcMonth: 0,
            };
          if (inter.country === "etc")
            return {
              ...inter,
              krMonth: "",
              usMonth: "",
              cnMonth: "",
              jpMonth: "",
              euMonth: "",
              etcMonth: "0",
            };
        })
      );
    }
  }, []);

  return (
    <Form action={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-3. (최고기술국 대비 기술격차)&nbsp;
          <span className="font-normal">
            선택하신 중분류 기술별 최고기술국 대비 상대적 기술격차를 국가별로
            “개월” 단위로 입력해주시기
            <br />
            바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 기술격차 : 최고기술국(0개월)을 기준으로, 최고 기술국의 기술력을
          따라잡기 위해 소요되는 기간
        </Text>
        <Text className="indent-4">
          ※ 앞서 귀하께서 중분류 기술별로 제시하신 기술수준(3Q-2) 순위를
          참고하시어 국가별 기술격차에 응답해 주시기 바랍니다.
        </Text>
        <section className="mt-8 border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              중분류
            </div>
            <div className="flex justify-center items-center border-r border-b bg-gray-100 text-xl font-bold">
              최고기술
              <br />
              보유국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              한국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              미국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              중국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              일본
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              유럽
            </div>
            <div className="border-b bg-gray-100 text-xl font-bold leading-20">
              기타*
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article
                key={inter.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
              >
                <div className="row-span-2 flex justify-center items-center border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <Tooltip title={inter.description}>
                    <button type="button" className="text-red-400">
                      (!)
                    </button>
                  </Tooltip>
                </div>
                <div className="flex justify-center items-center border-r border-b text-lg font-bold">
                  {inter.country === "kr" && "한국"}
                  {inter.country === "us" && "미국"}
                  {inter.country === "cn" && "중국"}
                  {inter.country === "jp" && "일본"}
                  {inter.country === "eu" && `유럽(${inter.euName})`}
                  {inter.country === "etc" && `기타(${inter.etcName})`}
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "kr" ? 0 : 1}
                    aria-label="krMonth"
                    name="krMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.krMonth || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, krMonth: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "kr"}
                    required
                  />
                  개월
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "us" ? 0 : 1}
                    aria-label="usMonth"
                    name="usMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.usMonth || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, usMonth: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "us"}
                    required
                  />
                  개월
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "cn" ? 0 : 1}
                    aria-label="cnMonth"
                    name="cnMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.cnMonth || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, cnMonth: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "cn"}
                    required
                  />
                  개월
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "jp" ? 0 : 1}
                    aria-label="jpMonth"
                    name="jpMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.jpMonth || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, jpMonth: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "jp"}
                    required
                  />
                  개월
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "eu" ? 0 : 1}
                    aria-label="euMonth"
                    name="euMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.euMonth || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, euMonth: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "eu"}
                    required
                  />
                  개월
                </div>
                <div className="flex items-center border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min={inter.country === "kr" ? 0 : 1}
                    aria-label="etcMonth"
                    name="etcMonth"
                    className="flex-1"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.etcMonth || ""
                    }
                    disabled
                  />
                  개월
                </div>
                <div className="border-r border-b">기술수준 순위</div>
                <div className="border-b col-span-6">
                  {[
                    { per: inter.krPer, coun: "한국" },
                    { per: inter.usPer, coun: "미국" },
                    { per: inter.cnPer, coun: "중국" },
                    { per: inter.jpPer, coun: "일본" },
                    { per: inter.euPer, coun: "유럽" },
                    { per: inter.etcPer, coun: "기타" },
                  ]
                    .sort((a, b) => b.per - a.per)
                    .map((item, index, self) => (
                      <span key={index}>{`${item.coun}(${item.per}%) ${
                        index !== self.length - 1
                          ? item.per > self[index + 1]?.per
                            ? ">"
                            : "="
                          : ""
                      } `}</span>
                    ))}
                </div>
              </article>
            ))}
        </section>
        <Text>
          ※ 최고기술 보유국에 제시된 국가는 무조건 0개월로 기재해야 하며, 나머지
          국가는 해당 국가와 비교하여 상대적 기술격차를 “개월” 단위로 제시
        </Text>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">다음</Button>
      </footer>
    </Form>
  );
}
