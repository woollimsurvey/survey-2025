"use client";

import { useEffect } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text, Strong } from "@/components/text";
import { Radio, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Independence() {
  const router = useRouter();

  const { checkedInter, setCheckedInter } = useForm();

  const handleChangeInde = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, independence: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push("/gap");
  };

  const handleNext = () => {
    router.push("/way");
  };

  useEffect(() => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (!prev.independence) {
          return { ...prev, independence: "1" };
        }

        return prev;
      })
    );
  }, []);

  return (
    <Form action={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기술성) 위원님께서 선택하신 중분류 기술들의 기술성을 평가할 수 있는
          하위 문항에 응답해주시기 바랍니다.
        </h3>
        <Heading level={4}>
          3Q-4. (기술 자립도)&nbsp;
          <span className="font-normal">
            아래 설명을 참고하시어 선택하신 기술분류별로 5개의 항목 중 기술
            자립도에 가장 적합한 구분자를 선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 기술 자립도 : 해외 기술 의존도 대비 국내 기술 자립 수준
        </Text>
        <section className="my-4">
          <Heading level={5} className="my-2 text-center">
            &lt; 기술 자립도 설명 &gt;
          </Heading>
          <div className="grid grid-cols-[2fr_3fr] border text-center">
            <div className="border-r border-b bg-gray-100 text-lg font-bold leading-8">
              기술 자립도 구분
            </div>
            <div className="border-b bg-gray-100 text-lg font-bold leading-8">
              설명
            </div>
            <div className="border-r border-b">
              ① 해외 기술 의존도가 매우 높음
              <br />
              (국내 자립도가 매우 낮음)
            </div>
            <div className="flex justify-center items-center border-b">
              핵심 원천기술·설계·알고리즘·장비·소재를 해외에 전적으로
              의존하여&nbsp;
              <Strong>국내 단독 개발·생산·운영이 사실상 불가</Strong>
            </div>
            <div className="border-r border-b">
              ② 해외 기술 의존도가 높음
              <br />
              (국내 자립도가 낮음)
            </div>
            <div className="flex justify-center items-center border-b">
              해외 라이선스·부품 없이는 성능/원가 목표 달성이 곤란하고,&nbsp;
              <Strong>운영은 제한적으로 가능하나 규모 확장성 낮음</Strong>
            </div>
            <div className="flex justify-center items-center border-r border-b">
              ③ 해외·국내 기술 의존도가 비슷함
            </div>
            <div className="border-b">
              핵심 요소 일부는 국내 내재화,&nbsp;
              <Strong>일부는 해외 의존으로 상호 보완 구조</Strong>로, 해외 조달
              지연 시 단기 운영은 가능하나 성능·원가 손실 발생
            </div>
            <div className="border-r border-b">
              ④ 국내 기술 자립도가 높음
              <br />
              (해외 기술 보조적으로만 활용)
            </div>
            <div className="flex justify-center items-center border-b">
              핵심 요소기술&nbsp;
              <Strong>대부분을 국내에서 설계·제작·운영 가능</Strong>하며,&nbsp;
              <Strong>해외 기술은</Strong> 성능 보완/비용 절감 등&nbsp;
              <Strong>보조적 역할</Strong>
            </div>
            <div className="border-r">
              ⑤ 국내 독자적 기술 자립도가 매우 높음
              <br />
              (해외 의존도 거의 없음)
            </div>
            <div className="flex justify-center items-center">
              <Strong>
                국내 공급망만으로 안정적 기술 대량 생산/서비스 가능
              </Strong>
              하며 해외에 기술 제공·수출 가능
            </div>
          </div>
        </section>
        <section className="border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_5fr] bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r border-b">
              중분류
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr]">
              <div className="col-span-5 border-b leading-10">기술 자립도</div>
              <div className="border-r border-b p-2">
                ① 해외 기술 의존도가 매우 높음
              </div>
              <div className="border-r border-b p-2">
                ② 해외 기술 의존도가 높음
              </div>
              <div className="border-r border-b p-2">
                ③ 해외·국내 기술 의존도가 비슷함
              </div>
              <div className="border-r border-b p-2">
                ④ 국내 기술 자립도가 높음
              </div>
              <div className="border-b p-2">
                ⑤ 국내 독자적 기술 자립도가 매우 높음
              </div>
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[2fr_5fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <RadioGroup
                  name="independence"
                  aria-label="independence"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr]"
                  onChange={(e) => handleChangeInde(e, inter)}
                  defaultValue={inter.independence || "1"}
                >
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="1" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="2" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="3" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="4" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-b">
                    <Radio value="5" />
                  </div>
                </RadioGroup>
              </article>
            ))}
        </section>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">다음</Button>
      </footer>
    </Form>
  );
}
