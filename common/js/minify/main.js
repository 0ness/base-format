/*==============================================================================

	�T�C�g�����@�@�\�E���o�p

	�E��{�̏�Ԃ��ێ�����K�v�͖����A�v���W�F�N�g�ɂ���ăJ�X�^�}�C�Y����
	�E�@�\���������o�������œK�������̃t���[�ō\�z

==============================================================================*/


//SCRIPT START
function init(){


	/*const �萔�@����JS�����ŃO���[�o���Ɏg���萔
	--------------------------------------------------------------------*/
	//DOM�I�u�W�F�N�g
	var win = window;
	var doc = document;

	//�I�u�W�F�N�g
	var pages = new PageInfo();
	var lib = new Library();
	
	//������
	var strPageUA = pages.UA();           //���[�U�[�G�[�W�F���g�ێ�
	var strPageVER = pages.VER();         //IE�̃o�[�W�����ێ�
	var strPageID = pages.ID();		      //�y�[�WID
	var strPageClass = pages.Category();  //�y�[�Wclass

	//���ےl
	var flgPageMobile = pages.mobile();    //���o�C������


	/*var �ϐ��@����JS�����ŃO���[�o���Ɏg���ϐ�
	--------------------------------------------------------------------*/
	//���l
	var numWinWidth = win.innerWidth || doc.body.clientWidth;  //�E�B���h�E��
	var numWinHeight = win.innerHeight || doc.body.clientHeight;//�E�B���h�E����


	//jquery�J�n
	$(function(){

		$.fx.interval = 20;

        //jQuery�I�u�W�F�N�g
        var $ancherTag = (strPageUA === "webkit") ? $("body"):$("html");


		/*contents �R���e���c���̏���
		--------------------------------------------------------------------*/
        //TOP�y�[�W
        function topPage(){

			var test = function(){};

            return false;
        }


		/*contents �֐�����@ID�EClass�ŏ�����ύX
		--------------------------------------------------------------------*/
        //PC�p�֐�
        var screenFunc = function(){
            if(strPageID === "top") topPage();
            return false;
        };

        //���o�C���p�֐�
        var mobileFunc = function(){
            if(strPageID === "top") topPage();
            return false;
        };

        //�^�u���b�g�p�֐�
        var tabletFunc = function(){
            return false;
        };

        //�f�o�C�X����
		if( flgPageMobile === true) mobieFunc();
        else screenFunc();
	});
	
	
	
	return false;
};


//contents �X�N���v�g����J�n
if(window.addEventListener) window.addEventListener("load",init, false);
else window.attachEvent("onload",init);
//SCRIPT END