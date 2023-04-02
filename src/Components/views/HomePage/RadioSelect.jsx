import { Radio, Space } from 'antd';

const RadioSelect = ({value, setValue}) => {

    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div style={{ marginTop: "1rem" }}>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={'Fantasy'}>Fantasy</Radio>
                        <Radio value={'Ego Strengthening & Confidence'}>Ego Strengthening & Confidence</Radio>
                        <Radio value={'Abundance'}>Abundance</Radio>
                        <Radio value={'Healing Light'}>Healing Light</Radio>
                        <Radio value={'Flying and Floating'}>Flying and Floating</Radio>
                        <Radio value={'Deep Inner Calm'}>Deep Inner Calm</Radio>
                        <Radio value={'Eliminate a Habit'}>Eliminate a Habit</Radio>
                    </Space>
                </Radio.Group>
            </div>
        </>
    );
};
export default RadioSelect;
