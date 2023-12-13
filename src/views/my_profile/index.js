import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import GeneralTabContent from './GeneralTabContent'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../redux/selectors/entitiesSelector";
import { userActions } from "../../redux/actions";
import { useTranslation } from "react-i18next";

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  const { t, i18n } = useTranslation();


  const dispatch = useDispatch();

  const currentUser = useSelector(userDataSelector.currentUser);

  const userPaginationSetting = useSelector(userDataSelector.pagination);

  const getCurrentUser = (param) => {
    dispatch(userActions.getUserInfo(param))
  }

  const updateUser = (data) => {
    dispatch(userActions.updateUser(
      data,
      null,
      null,
      t('Changed user successfully')
    ));
  }
  
  const handleUpdateUser = (currentUser) => {
    if (currentUser) {
      updateUser(currentUser); // update
    }
  }

  useEffect(() => {
    getCurrentUser(userPaginationSetting);
  }, [])

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Account Settings' breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      {currentUser !== null ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralTabContent 
                      currentUser={currentUser} 
                      handleUpdateUser={(currentUser) => handleUpdateUser(currentUser)}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default MyProfile